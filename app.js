const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const employeeRoutes = require('./routes/employee');
require('dotenv').config();

const app = express();
const port = 3000;

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Log incoming requests for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    console.log('Request Body:', req.body);  // Log the request body
    next();
});

// Employee routes
app.use('/employees', employeeRoutes);

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve employees.html for the employee list route
app.get('/employees.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'employees.html'));
});

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.log('Error connecting to MongoDB Atlas:', error);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
