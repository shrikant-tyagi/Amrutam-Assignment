const express = require('express');
const router = express.Router();

const {login , signUp } = require('../controllers/Auth');
const {auth} = require('../middlewares/auth');

// **************************** Authentication Routes ********************************************

router.post("/login", login);
router.post("/signup" , signUp);
router.post('/auth', auth);

module.exports = router;