const express = require('express');
const router = express.Router();
const { registerGuard } = require('../controllers/guardController');

router.post('/register', registerGuard);

module.exports = router;
