 const medicineModel = require('../../models/Medicine');

const upload = require('../../config/multerConfig');
const multerMiddleware = upload.single('Picture');

const addMedicine = async (req, res) => {
    try {
        const { name, Description, activeIngredients, price, medicalUse, availableQuantity  , otc} = req.body;
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload Medicine Picture' });
        }

        // Check if the medicine already exists in the database
        const existingMedicine = await medicineModel.findOne({ name });

        if (existingMedicine) {
            // If the medicine already exists, update the available quantity
            existingMedicine.availableQuantity += availableQuantity;
            await existingMedicine.save();
            res.status(200).json(existingMedicine);
        } else {
            // If the medicine doesn't exist, create a new medicine instance
            const newMedicine = new medicineModel({
                name,
                Description,
                activeIngredients,
                price,
                medicalUse,
                availableQuantity: availableQuantity, 
                Picture : req.file.filename,
                otc,
            });


            await newMedicine.save();

            res.status(200).json(newMedicine);
        }
    } catch (error) {
        console.error(error); // Log the actual error to the console
        res.status(500).json({ message: error.message });
    }
};

const editMedicine = async (req, res) => {
    try {
      const { name, ...updates } = req.body;
      const medicine = await medicineModel.findOne({ name });
  
      if (!medicine) {
        return res.status(404).json({ error: 'Medicine not found' });
      }
      for (const key in updates) {
        if (Object.hasOwnProperty.call(updates, key)) {
          medicine[key] = updates[key];
        }
      }
      if(req.file){
        medicine.Picture = req.file.filename;
      }
  
      // Save the updated medicine to the database
      await medicine.save();
  
      res.status(200).json({ message: 'Medicine details updated successfully', medicine });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


const viewMedicines = async (req, res) => {
    try {
        const medicines = await medicineModel.find({availableQuantity: {$gt: 0}});

        if (!medicines || medicines.length === 0) {
            return res.status(404).json({ message: 'No medicines found.' });
        }

        return res.status(200).json({ medicines });
    } catch (error) {
        console.error('Error fetching medicines:', error);
        return res.status(500).json({ error: 'Failed to fetch medicines.' });
    }
};



const viewMedicinesPharmacist = async (req, res) => {
    try {
        const medicines = await medicineModel.find();

        if (!medicines || medicines.length === 0) {
            return res.status(404).json({ message: 'No medicines found.' });
        }

        return res.status(200).json({ medicines });
    } catch (error) {
        console.error('Error fetching medicines:', error);
        return res.status(500).json({ error: 'Failed to fetch medicines.' });
    }
};



  module.exports = { multerMiddleware, addMedicine,editMedicine, viewMedicines,viewMedicinesPharmacist };
  


 