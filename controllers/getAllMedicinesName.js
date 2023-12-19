const Medicine= require('../models/Medicine');

const getAllMedicineNames = async (req, res) => {
    try {
        const medicines = await Medicine.find();

        if (!medicines || medicines.length === 0) {
            return res.status(404).json({ message: 'No medicines found.' });
        }

        // Extract only the names from the medicine objects
        const medicineNames = medicines.map(medicine => medicine.name);

        return res.status(200).json({ medicineNames });
    } catch (error) {
        console.error('Error fetching medicines:', error);
        return res.status(500).json({ error: 'Failed to fetch medicines.' });
    }
};
module.exports = {getAllMedicineNames};