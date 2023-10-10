const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const Port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false })); // Add this line to parse form data

// Connect to MongoDB
mongoose.connect('mongodb+srv://rawanelashmawy:rawanelashmawy@infodb.srentmg.mongodb.net/ClinicPharmaDB')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

// Import your routes here
const path = require('path');
const { registerPPatient, registerPharmacist, loginUser } = require('./controllers/GuestController');
const viewList = require('./controllers/AdminController');
const MedicineController = require('./controllers/MedicineController'); // Import MedicineController


// Add a route for the home page
app.get("/register", (req, res) => {
    const filePath = path.join(__dirname, "pages", "PPatientRegister.html");
    res.sendFile(filePath);
});


app.get("/PharmReg", (req, res) => {
    const filePath = path.join(__dirname, "pages", "PharmRegister.html");
    res.sendFile(filePath);
});
// Define your /addUser route here to handle the POST request
app.post("/addUser", registerPPatient);
app.post("/PharmReg",registerPharmacist);
app.post("/addMedicine",MedicineController.addMedicine);
// Start the server
app.listen(Port, () => {
    console.log("Server running at http://localhost:" + Port + "/");
});


app.get("/admin", (req, res) => {
    const filePath = path.join(__dirname, "pages", "admin.html");
    res.sendFile(filePath);
});

app.get("/medicine", (req, res) => {
    const filePath = path.join(__dirname, "pages", "Medicine.html");
    res.sendFile(filePath);
});


app.get("/ppatient", (req, res) => {
    const filePath = path.join(__dirname, "pages", "PPatient.html");
    res.sendFile(filePath);
});

app.get("/pharmacist", (req, res) => {
    const filePath = path.join(__dirname, "pages", "Pharmacist.html");
    res.sendFile(filePath);
});


