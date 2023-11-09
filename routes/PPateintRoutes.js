const express = require('express');
const router = express.Router();
//const PPatientController = require('../controllers/PPatientController');

router.get('/Medicine', (req, res) => {
    PPatientController.viewList(req, res);
});


module.exports = router;