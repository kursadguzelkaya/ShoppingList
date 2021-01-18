const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/Items')

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/key').mongoURI;

// connect mongoose
mongoose.connect(db, { useUnifiedTopology: true })
    .then(() => console.log('Mongo DB is connected...'))
    .catch(err => console.log(err))

const port = process.env.PORT || 5000;

// Use Routes
app.use('/api/items', items);

// Serve static assets ifin production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


app.listen(port, () => console.log(`Server sarted on port ${port}`));

