const Orders = require('../models/Order');
const {common} = require("@mui/material/colors");

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


    try {
        // Get sales for the specific month


        const currentDate = new Date();

        const currentMonth = await getSalesData(currentDate.getMonth() + 1, currentDate.getFullYear());
        const pastMonthsData = {};


        let startMonth = (currentDate.getMonth() + 12) % 12; // Use modulo to handle month wrapping
        let startYear = currentDate.getFullYear();
        if (startMonth == 0) {
            startYear--;
            startMonth = 12;
        }

        for (let i = 0; i < 11; i++) {

            const monthData = await getSalesData((startMonth), startYear);
            let monthName = new Date(`${startYear}-${startMonth}-01`).toLocaleString('default', {month: 'long'});
            if (i==0)
                monthName = "Last Month";
            pastMonthsData[monthName] = monthData[0]; // Assuming the result is an array with a single object

            // Update startMonth and startYear for the next iteration
            startMonth = (startMonth - 1 + 12) % 12;
            if (startMonth == 0) {
                startYear--;
                startMonth = 12;
            }
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
};


module.exports = {TotalSales, SalesPerMonth};