const express = require('express');
const router = express.Router();
const {addAddress} = require('../controllers/Patient/addAddress');
const {cancelOrder} = require('../controllers/Patient/CancelOrder');
const {getAddress} = require('../controllers/Patient/getAddress');
const {getOrders} = require('../controllers/Patient/getOrders');
const {getTotalAmount} = require('../controllers/Patient/getTotalAmount');
const {ifPaymentDone} = require('../controllers/Patient/ifPaymentDone');
const {payOrder} = require('../controllers/Patient/payOrder');
const {CreatePatient} = require('../controllers/Patient/CreatePatient');
const {getCart , updateMedicine} = require('../controllers/Patient/updateMedicine');
const {checkValidity} = require('../controllers/Patient/checkValidity');

router.post('/addAddress', addAddress);
router.get('/getAddress', getAddress);

router.get('/getOrders', getOrders);
router.patch('/cancelOrder/:orderId', cancelOrder);
router.get('/getTotalAmount', getTotalAmount);
router.post('/ifPaymentDone/:username', ifPaymentDone);
router.post('/payOrder', payOrder);

router.post('/CreatePatient', CreatePatient);

router.get('/getCart', getCart);
router.patch('/updateMedicine', updateMedicine);
//router.get('/checkValidity', checkValidity);


module.exports = router;