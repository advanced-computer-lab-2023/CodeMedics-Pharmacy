const express = require('express');
const router = express.Router();
const PharmacistContoller = require('../controllers/PharmacistContoller');

router.get('/Medicine', (req, res) => {
    PharmacistContoller.viewList(req, res);
});


module.exports = router;