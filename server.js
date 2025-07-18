require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());


// Import routes
const routeAuth = require('./routes/auth');
const routeEntries = require('./routes/entries');
const routePersonalEntries = require('./routes/personalEntries');
const routeCostPerKm  = require('./routes/costPerKm');
const routeMaintenance = require('./routes/maintenance');
const routePeronalMaintenance = require('./routes/personalMaintenance');

// Routes
app.use(routeAuth);
app.use(routeEntries);
app.use(routePersonalEntries);
app.use(routeCostPerKm);
app.use(routeMaintenance);
app.use(routePeronalMaintenance);

app.get('/', (req, res) => {
  res.send('🚀 API está ativa!');
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI,)
    .then(() => {
        app.emit('ready');
        console.log('Connected to MongoDB');
    })
    .catch((err) => console.log(err));

app.on('ready', () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});