 // Import the Medicine model
 //const MedicineController = require('../controllers/MedicineController');
 //const Medicine = require('../models/Medicine'); 
 const medicineModel = require('../models/Medicine');

 const addMedicine = async (req, res) => {
    try {
        const { name, activeIngredients, price, medicalUse , availableQuantity } = req.body;
        console.log(req.body);
        // Create a new medicine instance
        const newMedicine = new medicineModel({
            name,
            activeIngredients,
            price,
            medicalUse,
            availableQuantity
        });

        // Save the medicine to the database
        await newMedicine.save();

        res.status(201).json(newMedicine);
    } catch (error) {
        console.error(error); // Log the actual error to the console
        res.status(500).json({ error: 'Error adding medicine' });
    }
};

module.exports = {addMedicine};

 