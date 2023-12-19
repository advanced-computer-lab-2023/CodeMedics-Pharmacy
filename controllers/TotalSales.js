const Orders = require('../models/Order');
const Medicine = require('../models/Medicine');
const {common} = require("@mui/material/colors");

const getSalesPerYear = async (req, res) => {

    try {

        const currentDate = new Date('2023-12-01');

        const currentMonth = await getSalesData(currentDate.getMonth() + 1, currentDate.getFullYear());
        const pastMonthsData = {};

        let startMonth = (currentDate.getMonth() + 12) % 12; // Use modulo to handle month wrapping
        let startYear = currentDate.getFullYear();
        // if (startMonth == 0) {
        //     startYear--;
        //     startMonth = 12;
        // }

        for (let i = 0; startMonth>0; i++) {

            const monthData = await getSalesData((startMonth), startYear);
            let monthName = new Date(`${startYear}-${startMonth}-01`).toLocaleString('default', {month: 'long'});
            if (i==0)
                monthName = "Last Month";
            pastMonthsData[monthName] = monthData[0]; // Assuming the result is an array with a single object

            // Update startMonth and startYear for the next iteration
            startMonth = (startMonth - 1 + 12) % 12;
            // if (startMonth == 0) {
            //     startYear--;
            //     startMonth = 12;
            // }
        }
        const response = {
            currentMonth,
            pastMonths: pastMonthsData
        };
        // Organize the results by month


        return res.status(200).json(response);
    } catch (err) {
        res.status(400).json({message: "Invalid month or year"});
    }
};


const getSalesData = async (month, year) => {
    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(`${year}-${month}-01`);
    endDate.setMonth(endDate.getMonth() + 1);

    return Orders.aggregate([
        {
            $match: {
                status: "completed",
                createdAt: {
                    $gte: startDate,
                    $lt: endDate
                }
            }
        },
        {
            $group: {
                _id: "$PatientId",
                totalAmount: {$sum: "$amount"},
                totalOrders: {$sum: 1}
            }
        },
        {
            $group: {
                _id: null,
                totalPatients: {$sum: 1},
                totalSales: {$sum: "$totalAmount"},
                totalCompletedOrders: {$sum: "$totalOrders"}
            }
        }
    ]);
};

const getSalesDataByMedicine = async (req, res) => {

    try {
        const medicineSales = await Medicine.aggregate([
            {
                $lookup: {
                    from: "Order",
                    let: {
                        medicineId: {
                            $toString: "$_id"
                        }
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: [
                                                "$status",
                                                "completed"
                                            ]
                                        },
                                        {
                                            $in: [
                                                "$$medicineId",
                                                "$items.MedicineId"
                                            ]
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            $set: {
                                items: {
                                    $filter: {
                                        input: "$items",
                                        cond: {
                                            $eq: [
                                                "$$this.MedicineId",
                                                "$$medicineId"
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    "as": "orders"
                }
            },
            {
                $match: {
                    orders: {
                        $ne: []
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    medicineId: "$_id",
                    medicineName: "$name",
                    picture: "$Picture", // Add this line to include the "Picture" attribute
                    availableQuantity: "$availableQuantity", // Add this line to include the "availableQuantity" attribute
                    // Adjust to your actual field name in Medicine model
                    totalQuantity: {
                        $sum: {
                            $reduce: {
                                input: "$orders",
                                initialValue: [],
                                in: {
                                    $concatArrays: [
                                        "$$value",
                                        "$$this.items.Quantity"
                                    ]
                                }
                            }
                        }
                    },
                    totalAmount: {
                        $multiply: [
                            {
                                $sum: {
                                    $reduce: {
                                        input: "$orders",
                                        initialValue: [],
                                        in: {
                                            $concatArrays: [
                                                "$$value",
                                                "$$this.items.Quantity"
                                            ]
                                        }
                                    }
                                }
                            },
                            "$price"
                        ]
                    }
                }
            }
        ]);

        return res.status(200).json(medicineSales);
    } catch (err) {
        console.error("Error fetching medicine sales data:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }

};

module.exports = {getSalesPerYear, getSalesDataByMedicine};