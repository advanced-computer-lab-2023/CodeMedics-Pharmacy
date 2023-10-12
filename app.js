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
mongoose.connect('mongodb+srv://JanaKorayem:JanaKorayem@infodb.srentmg.mongodb.net/ClinicPharmaDB')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

app.listen(Port, () => {
    console.log("Server running at http://localhost:" + Port + "/");
});

// Import your routes here
const path = require('path');
const { registerPPatient, registerPharmacist, loginUser } = require('./controllers/GuestController');

const AdminRoutes = require('./routes/AdminRoutes')
const {viewList, createAdmin} = require('./controllers/AdminController');
const {addMedicine, editMedicine, viewMedicines} = require('./controllers/MedicineController'); // Import MedicineController

const AuthRoutes = require('./routes/AuthRoutes');
const {createPharmacist} = require('./controllers/PharmacistController');


app.get("/", (req, res) => {
    const filePath = path.join(__dirname, "pages", "Home.html");
    res.sendFile(filePath);
});

app.get("/register", (req, res) => {
    const filePath = path.join(__dirname, "pages", "PPatientRegister.html");
    res.sendFile(filePath);
});

app.get("/Pharmregister", (req, res) => {
    const filePath = path.join(__dirname, "pages", "PharmRegister.html");
    res.sendFile(filePath);
});

app.get("/viewMedicines", (req, res) => {
    const filePath = path.join(__dirname, "pages", "viewMedicines.html");
    res.sendFile(filePath);
});

app.use('/register', AuthRoutes);
app.use('/Pharmregister', AuthRoutes);


app.put('/editMedicine',editMedicine);
// Start the server


app.get("/admin", (req, res) => {
    const filePath = path.join(__dirname, "pages", "admin.html");
    res.sendFile(filePath);
});

app.get("/addMedicine", (req, res) => {
    const filePath = path.join(__dirname, "pages", "addMedicine.html");
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

app.get("/medicine", (req, res) => {
    const filePath = path.join(__dirname, "pages", "Medicine.html");
    res.sendFile(filePath);
});

app.get("/CreateAdmin", (req, res) => {
    const filePath = path.join(__dirname, "pages", "CreateAdmin.html");
    res.sendFile(filePath);
});

app.get("/createPharmacist", (req, res) => {
    const filePath = path.join(__dirname, "pages", "createPharmacist.html");
    res.sendFile(filePath);
});

app.get("/viewPharmacists", (req, res) => {
    const filePath = path.join(__dirname, "pages", "ViewPharmacists.html");
    res.sendFile(filePath);
});

app.get("/viewPatients", (req, res) => {
    const filePath = path.join(__dirname, "pages", "viewPatients.html");
    res.sendFile(filePath);
});

app.get("/searchMedicine", (req, res) => {
    const filePath = path.join(__dirname, "pages", "Medicine.html");
    res.sendFile(filePath);
});

app.get("/viewPharmacistApplications", (req, res) => {
    const filePath = path.join(__dirname, "pages", "viewPharmacistApplications.html");
    res.sendFile(filePath);
});

app.get("/getMedicalUses", (req, res) => {
    const filePath = path.join(__dirname, "pages", "Medicine.html");
    res.sendFile(filePath);
});

app.get("/getMedicinesByMedicalUse", (req, res) => {
    const filePath = path.join(__dirname, "pages", "Medicine.html");
    res.sendFile(filePath);
});


app.use('/register', AuthRoutes);
app.use('/Pharmregister', AuthRoutes);
app.use('/CreateAdmin', AdminRoutes);


app.post("/register", registerPPatient);
app.post("/Pharmregister",registerPharmacist);
app.post("/addMedicine", addMedicine);
app.post("/addUser", registerPPatient);
app.post("/CreateAdmin", createAdmin);
app.post("/createPharmacist", createPharmacist);

app.get("/Medicines",viewMedicines);
// Define your /addUser route here to handle the POST request
// app.post("/register", registerPPatient);
// app.post("/Pharmregister",registerPharmacist);
// app.post("/addMedicine", addMedicine);
