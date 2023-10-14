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

//   const viewMedicines = async (req, res) => {
//     try {
//         const medicines = await medicineModel.find();

//         if (!medicines || medicines.length === 0) {
//             return res.status(404).json({ message: 'No medicines found.' });
//         }
       
//         return res.status(200).json({ medicines });
//     } catch (error) {
//         return res.status(500).json({ error: 'Failed to fetch pharmacists.' });
//     }
// };



const getMedicinesByMedicalUse = async (req, res) => {
  const { medicalUse } = req.query;

  console.log(medicalUse);

  try {
      const medicines = await medicineModel.find( {medicalUse} );
        console.log(medicines);
      if (medicines.length === 0) {
          return res.status(404).json({ message: 'No medicines found with the specified medical use.' });
      }
      console.log("before return");
      return res.status(200).json({medicines: medicines});
  } catch (error) {
      console.error('Error retrieving medicines by medical use:', error);
      return res.status(500).json({ error: 'Failed to retrieve medicines by medical use.' });
  }
};

const searchMedicine = async (req, res) => {

  const searchQuery = req.body.name
  try {
      const medicines = await medicineModel.find({
          name: { $regex: new RegExp(`^${searchQuery}`, 'i') }, 
       
      });

      if (medicines.length === 0) {
          return res.status(404).json({ message: 'No medicines found with the provided name.' });
      }
      return res.status(200).json(medicines);
  } catch (error) {
      console.error('Error searching for medicines:', error);
      return res.status(500).json({ error: 'Failed to search for medicines.' });
  }
};

const getMedicalUses = async (req, res) => {
  try {
      const uniqueMedicalUses = await medicineModel.distinct('medicalUse');

      if (uniqueMedicalUses.length === 0) {
          return res.status(404).json({ message: 'No unique medical uses found.' });
      }

      return res.status(200).json({ medicalUses: uniqueMedicalUses });
  } catch (error) {
      console.error('Error retrieving medical uses:', error);
      return res.status(500).json({ error: 'Failed to retrieve medical uses.' });
  }

};
const Medicine = require('../models/Medicine');

const viewMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find({}, 'name price Description Picture');

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
        const medicines = await Medicine.find({}, 'name price Description Picture sales availableQuantity');

        if (!medicines || medicines.length === 0) {
            return res.status(404).json({ message: 'No medicines found.' });
        }

        return res.status(200).json({ medicines });
    } catch (error) {
        console.error('Error fetching medicines:', error);
        return res.status(500).json({ error: 'Failed to fetch medicines.' });
    }
};



  module.exports = { addMedicine,editMedicine, viewMedicines,viewMedicinesPharmacist,getMedicinesByMedicalUse,searchMedicine, getMedicalUses };
  


 