const express = require('express');
const router = express.Router();
const { getPatientChats } = require('../controllers/Chat/PatientChats');
const { getChats } = require('../controllers/Chat/Chats');
const { getMessages , sendMessage } = require('../controllers/Chat/Messages');

router.get('/getPatientChats', getPatientChats);
router.get('/getChats', getChats);
router.get('/getMessages', getMessages);
router.post('/sendMessage', sendMessage);

module.exports = router;