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

// Import your routes here
const path = require('path');
const { registerPPatient, loginUser } = require('./controllers/GuestController');

// Add a route for the home page
app.get("/register", (req, res) => {
    const filePath = path.join(__dirname, "pages", "PPatientRegister.html");
    res.sendFile(filePath);
});

// Define your /addUser route here to handle the POST request
app.post("/addUser", registerPPatient);

// Start the server
app.listen(Port, () => {
    console.log("Server running at http://localhost:" + Port + "/");
});
