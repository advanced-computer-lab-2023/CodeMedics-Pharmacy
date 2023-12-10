const createError = require('http-errors');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const colors = require('colors');
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,
    optionSuccessStatus: 200
};

const stripe = require("stripe")("sk_test_51OA3YuHNsLfp0dKZBQsyFFPLXepbGkt9p5xZzd2Jzzj6zxLqUTY2DYF244qILCi0cfVjg37szrwdXZzin83e5ijm00X5eXuTnM");

const connectDB = require('./config/MongoDBConnection');
const adminRoutes = require('./routes/AdminRoutes');
const pharmacistRoutes = require('./routes/PharmacistRoutes');
const patientRoutes = require('./routes/PateintRoutes');
const authRoutes = require('./routes/AuthRoutes');
const medicineRoutes = require('./routes/MedicineRoutes');

// Connect to MongoDB
connectDB().then(r => console.log("Connected to MongoDB 200 OK".bgGreen.bold));

//Start Express server
const app = express();
const Port = process.env.PORT || 8001;

app.use(express.static("public"));
app.use(express.json());

//DeleteModelRecords.deleteAllRecords(); //uncomment this line to delete all records from a specific model

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.listen(Port);

console.log("Server running at http://localhost:" + process.env.PORT + "/");

app.set('view engine', 'ejs');

// routes

app.use('/medicine' , medicineRoutes);


app.use('/admin', adminRoutes);
app.use('/pharmacist', pharmacistRoutes);
app.use('/patient', patientRoutes);
app.use('/', authRoutes);
app.use('/medicine', medicineRoutes);



app.post("/package/create-payment-intent", async (req, res) => {
    // const { items } = req.body;
    const card = req.body.card;
    console.log("in the package payment intent");
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100,
      currency: "usd",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      }
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });

app.post("/create-payment-intent", async (req, res) => {
  // const { items } = req.body;
  const card = req.body.card;
  console.log("in the payment intent");
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    }
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = app;









// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// require('dotenv').config();
// const app = express();
// const Port = process.env.PORT || 8000;
// const stripe = require("stripe")('sk_test_51OA3YuHNsLfp0dKZBQsyFFPLXepbGkt9p5xZzd2Jzzj6zxLqUTY2DYF244qILCi0cfVjg37szrwdXZzin83e5ijm00X5eXuTnM');
// const Patient = require('./models/Patient');
// //const DeleteModelRecords = require('./config/DeleteAllRecords');

// const MongoURI = process.env.MONGO_URI;

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({extended: false})); // Add this line to parse form data

// mongoose.connect(MongoURI)
//     .then(() => {
//         console.log("Connected to MongoDB");
//     })
//     .catch((error) => {
//         console.error("MongoDB connection error:", error);
//     });

// app.listen(Port, () => {
//     console.log("Server running at http://localhost:" + Port + "/");
// });

// const os = require("os");
// /**
//  * Options are the same as multiparty takes.
//  * But there is a new option "autoClean" to clean all files in "uploadDir" folder after the response.
//  * By default, it is "false".
//  */
// const options = {
//     uploadDir: os.tmpdir(),
//     autoClean: true
// };

// const path = require('path');
// const ifPaymentDone = require('./controllers/ifPaymentDone');
// const checkValidity = require('./controllers/checkValidity');
// const cancelOrder = require('./controllers/cancelOrder');
// const upload = require('./config/multerConfig');
// const {registerPPatient, registerPharmacist, loginUser} = require('./controllers/GuestController');
// const {resetPassword} = require('./controllers/ResetPassword');
// const {changePassword} = require('./controllers/changePassword');
// const AdminRoutes = require('./routes/AdminRoutes')
// const {
//     createAdmin,
//     removePharmacist,
//     removePatient,
//     viewPharmacistApplications,
//     viewPharmacists,
//     viewPatients,
//     acceptPharmacist,
//     rejectPharmacist
// } = require('./controllers/AdminController');
// const {
//     multerMiddleware,
//     addMedicine,
//     editMedicine,
//     viewMedicines,
//     viewMedicinesPharmacist,
//     searchMedicine,
//     getMedicinesByMedicalUse,
//     getMedicalUses
// } = require('./controllers/MedicineController');

// const getOrders = require('./controllers/getOrders');


// const AuthRoutes = require('./routes/AuthRoutes');
// const {createPharmacist} = require('./controllers/PharmacistController');
// const {getTotalAmont} = require('./controllers/getTotalAmount');

// const {getAdress} = require('./controllers/getAddress');
// const {addAddress} = require('./controllers/addAddress');

// const {getMe} = require('./controllers/getMe');

// app.get("/getMe", getMe);

// app.put('/addAddress', addAddress);

// app.get("/getAddress", getAdress);

// app.patch("/getTotalAmount", getTotalAmont);

// const {updateMedicine, getCart} = require('./controllers/updateMedicine');

// app.post("/create-payment-intent", async (req, res) => {
//     const card = req.body;
//     console.log("we are in the create payment intent");
//     // Create a PaymentIntent with the order amount and currency
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: 100,
//       currency: "usd",
//       // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
//       automatic_payment_methods: {
//         enabled: true,
//       }
//     });
  
//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   });

// app.get("/user/checkValidity", checkValidity);

// app.get("/user/getOrders", getOrders);

// app.post('/resetPassword', resetPassword);

// app.post("/cancelOrder", cancelOrder);

// app.get("/", (req, res) => {
//     const filePath = path.join(__dirname, "pages", "Home.html");
//     res.sendFile(filePath);
// });

// app.get("/register", (req, res) => {
//     const filePath = path.join(__dirname, "pages", "PPatientRegister.html");
//     res.sendFile(filePath);
// });

// // app.get("/Pharmregister", (req, res) => {
// //     const filePath = path.join(__dirname, "pages", "PharmRegister.html");
// //     res.sendFile(filePath);
// // });

// app.patch("/updateMedicine", updateMedicine);
// app.post("/changePassword", changePassword);

// app.post("/edit", editMedicine);
// app.get("/editMedicine", (req, res) => {
//     const filePath = path.join(__dirname, "pages", "editMedicine.html");
//     res.sendFile(filePath);
// });

// app.use('/register', AuthRoutes);
// //app.use('/Pharmregister', AuthRoutes);


// app.put('/editMedicine', editMedicine);


// app.get("/admin", (req, res) => {
//     const filePath = path.join(__dirname, "pages", "admin.html");
//     res.sendFile(filePath);
// });


// app.get("/addMedicine", (req, res) => {
//     const filePath = path.join(__dirname, "pages", "addMedicine.html");
//     res.sendFile(filePath);
// });

// app.get("/ppatient", (req, res) => {
//     const filePath = path.join(__dirname, "pages", "PPatient.html");
//     res.sendFile(filePath);
// });

// app.get("/pharmacist", (req, res) => {
//     const filePath = path.join(__dirname, "pages", "Pharmacist.html");
//     res.sendFile(filePath);
// });

// app.get("/medicine", (req, res) => {
//     const filePath = path.join(__dirname, "pages", "Medicine.html");
//     res.sendFile(filePath);
// });

// app.get("/CreateAdmin", (req, res) => {
//     const filePath = path.join(__dirname, "pages", "CreateAdmin.html");
//     res.sendFile(filePath);
// });

// app.get("/createPharmacist", (req, res) => {
//     const filePath = path.join(__dirname, "pages", "createPharmacist.html");
//     res.sendFile(filePath);
// });

// app.get("/viewPharmacists", (req, res) => {
//     const filePath = path.join(__dirname, "pages", "ViewPharmacists.html");
//     res.sendFile(filePath);
// });

// app.get("/viewMedicinePharmacist", (req, res) => {
//     const filePath = path.join(__dirname, "pages", "ViewMedicinePharmacist.html");
//     res.sendFile(filePath);
// });


// app.get("/viewPatient", (req, res) => {
//     const filePath = path.join(__dirname, "pages", "ViewPatient.html");
//     res.sendFile(filePath);
// });

// app.get("/searchMedicine", (req, res) => {
//     const filePath = path.join(__dirname, "pages", "Medicine.html");
//     res.sendFile(filePath);
// });

// app.get("/getMedicalUses", (req, res) => {
//     const filePath = path.join(__dirname, "pages", "Medicine.html");
//     res.sendFile(filePath);
// });

// app.get("/getMedicinesByMedicalUse", (req, res) => {
//     const filePath = path.join(__dirname, "pages", "Medicine.html");
//     res.sendFile(filePath);
// });

// app.get("/removePharmacist", (req, res) => {
//     const filePath = path.join(__dirname, "pages", "removePharmacist.html");
//     res.sendFile(filePath);
// });
// app.get("/removePatient", (req, res) => {
//     const filePath = path.join(__dirname, "pages", "removePatient.html");
//     res.sendFile(filePath);
// });
// // app.get("/viewPharmacistApplications", (req, res) => {
// //     console.log('Request to viewPharmacistApplications received');
// //     const filePath = path.join(__dirname, "pages", "viewPharmacistApplications.html");
// //     res.sendFile(filePath);
// // });
// app.get("/iewPharmacistApplications", viewPharmacistApplications);

// app.get("/viewPharmacistApplications", (req, res) => {
//     const filePath = path.join(__dirname, "pages", "viewPharmacistApplications.html");
//     res.sendFile(filePath);
// });

// app.post("/user/ifPaymentDone", ifPaymentDone)
// app.post("/edit", editMedicine);
// app.get("/editMedicine", (req, res) => {
//     const filePath = path.join(__dirname, "pages", "editMedicine.html");
//     res.sendFile(filePath);
// });
// // app.get("/viewPharmacistApplications", async (req, res) => {
// //     try {
// //         const pharmacistApplications = await viewPharmacistApplications();
// //         res.status(200).json({ pharmacistApplications });
// //     } catch (error) {
// //         console.error('Error fetching pharmacist applications:', error);
// //         res.status(500).json({ error: 'Failed to fetch pharmacist applications', detailedError: error.message });
// //     }
// // });

// app.get("/viewMedicines", (req, res) => {
//     const filePath = path.join(__dirname, "pages", "viewMedicines.html");
//     res.sendFile(filePath);
// });

// //
// app.use('/register', AuthRoutes);
// // app.use('/Pharmregister', AuthRoutes);
// app.use('/CreateAdmin', AdminRoutes);
// app.use('/auth', AuthRoutes);

// app.use('/uploads', express.static('uploads'));
// app.post("/register", registerPPatient);

// app.post('/Pharmregister', upload.fields([
//     {name: 'IDDocument', maxCount: 1},
//     {name: 'pharmacyDegree', maxCount: 1},
//     {name: 'workingLicense', maxCount: 1}
// ]), registerPharmacist);


// app.post('/addMedicine', multerMiddleware, addMedicine);


// app.post("/addUser", registerPPatient);
// app.post("/CreateAdmin", createAdmin);
// app.get("/getCart", getCart);
// app.post("/createPharmacist", createPharmacist);
// app.post("/login", loginUser);
// app.delete("/removePharmacist", removePharmacist);
// app.delete("/removePatient", removePatient);
// app.post("/acceptPharmacist", acceptPharmacist);
// app.post("/rejectPharmacist", rejectPharmacist);
// app.get("/viewPharmacistApplications", viewPharmacistApplications);


// app.patch("/ditMedicine", multerMiddleware ,editMedicine);
// app.get("/iewPatients", viewPatients);
// app.get("/iewPharmacists", viewPharmacists);
// app.get("/Medicines", viewMedicines);
// app.get("/MedicinesPharmacist", viewMedicinesPharmacist);
// app.post("/earchMedicine", searchMedicine);
// app.get("/MedicalUses", getMedicalUses);
// app.get("/ilterMedicine", getMedicinesByMedicalUse);



// // Define your /addUser route here to handle the POST request
// // app.post("/register", registerPPatient);
// // app.post("/Pharmregister",registerPharmacist);
// // app.post("/addMedicine", addMedicine);