const express = require('express');
const app = express();
const dbConnect = require('./config/database');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/User');
const doctorRoutes = require('./routes/Doctor');
const patientRoutes = require('./routes/Patient');
const cors = require('cors');

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin:'http://localhost:3000',
        credentials:true
    })
)
app.use(cookieParser());

//activating the server
const PORT = process.env.PORT || 4000;
app.listen(PORT , () => {
    console.log(`Server activating at Port ${PORT}`)
})

// Mapping the route
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/doctor", doctorRoutes);
app.use("/api/v1/patient", patientRoutes);

//default route
app.get('/' , (req,res) => {
    res.send("I am a default route");
})

dbConnect();