const express = require('express');
const router = express.Router();

const {getAllDoctors} = require('../controllers/Doctor');

router.get("/getAllDoctors", getAllDoctors);

module.exports = router;