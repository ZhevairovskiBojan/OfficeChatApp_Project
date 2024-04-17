const express = require ("express");
require('dotenv').config();

const connectDB = require("./server/config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Connect to Database
connectDB();


// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);



app.get('/', (req, res) => {
    res.send(" The Office Chat App is up and running!");

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});