 // Import the Medicine model
 //const MedicineController = require('../controllers/MedicineController');
 //const Medicine = require('../models/Medicine'); 
 const medicineModel = require('../models/Medicine');

 const addMedicine = async (req, res) => {
    try {
        const { name, Description, Picture,activeIngredients, price, medicalUse , availableQuantity } = req.body;
        console.log(req.body);
        // Create a new medicine instance
        const newMedicine = new medicineModel({
            name,
            Description,
            Picture,
            activeIngredients,
            price,
            medicalUse,
            availableQuantity,
        });

        // Save the medicine to the database
        await newMedicine.save();

        res.status(201).json(newMedicine);
    } catch (error) {
        console.error(error); // Log the actual error to the console
        res.status(500).json({ error: 'Error adding medicine' });
    }
};

const editMedicine = async (req, res) => {
    try {
      const { name, ...updates } = req.body;
  
      // Find the medicine by name
      const medicine = await medicineModel.findOne({ name });
  
      if (!medicine) {
        return res.status(404).json({ error: 'Medicine not found' });
      }
  
      // Update the medicine's details dynamically based on the keys in the request body
      for (const key in updates) {
        if (Object.hasOwnProperty.call(updates, key)) {
          medicine[key] = updates[key];
        }
      }
  
      // Save the updated medicine to the database
      await medicine.save();
  
      res.status(200).json({ message: 'Medicine details updated successfully', medicine });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating medicine details' });
    }
  };
  
  module.exports = { addMedicine,editMedicine };


 