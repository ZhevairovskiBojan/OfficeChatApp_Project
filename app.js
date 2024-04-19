const express = require ("express");
require('dotenv').config();
const cors = require("cors");

const connectDB = require("./server/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const eventsRoutes = require('./routes/eventRoutes');
const uploadRoutes = require('./uploads/uploads');




const app = express();

// Connect to Database
connectDB();



// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/events', eventsRoutes);
app.use('/', uploadRoutes);

// Use CORS middleware - this enables CORS for all routes and origins
app.use(cors());


app.get('/', (req, res) => {
    res.send(" The Office Chat App is up and running!");

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});