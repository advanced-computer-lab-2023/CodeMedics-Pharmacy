const Orders = require('../models/Order');

const TotalSales = async (req, res) => {
    try {
        const totalSales = await Orders.aggregate([
            {$match: {status: "Completed"}},
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
        return res.status(200).json(totalSales);
    } catch (err) {
        res.status(400).json({message: "Something went wrong when fetching data from database"});
    }

}


const SalesPerMonth = async (req, res) => {
    const {month, year} = req.body;
    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(`${year}-${month}-01`);
    endDate.setMonth(endDate.getMonth() + 1);
    try {
        const specificMonthSales = await Orders.aggregate([
            {
                $match: {
                    status: "Completed",
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
        return res.status(200).json(specificMonthSales);
    } catch (err) {
        res.status(400).json({message: "Invalid month or year"});
    }

};

module.exports = {TotalSales, SalesPerMonth};