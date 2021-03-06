const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const items = require('./routes/api/items');



// Bodyparser Middleware
app.use(bodyParser.json());

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db, { 
        useNewUrlParser: true,
        useCreateIndex: true })
    .then(() => console.log('CONNECTED'))
    .catch(err => console.log(err));

app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('server statrted on port: ', port);
});