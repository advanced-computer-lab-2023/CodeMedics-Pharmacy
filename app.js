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
mongoose.connect('mongodb+srv://janakorayem12:12345@trialcluster.0fqtxij.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

// Import your routes here
const path = require('path');
const { registerUser, loginUser } = require('./controllers/GuestController');

// Add a route for the home page
app.get("/register", (req, res) => {
    const filePath = path.join(__dirname, "pages", "index.html");
    res.sendFile(filePath);
});

// Define your /addUser route here to handle the POST request
app.post("/addUser", registerUser);

// Start the server
app.listen(Port, () => {
    console.log("Server running at http://localhost:" + Port + "/");
});
