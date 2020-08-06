const express = require('express'); //import package
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express();  //execute package

//Import Routes
const itemsRoute = require('./routes/items');
const testAPIRoute = require('./routes/testAPI')


app.use(cors());    //allows me to test in codepen.io
app.use(bodyParser.json()); //to parse through data

app.use('/items', itemsRoute);
app.use('/testAPI', testAPIRoute);


//ROUTES
app.get('/', (req, res) => {    //retrieves message, can use post, delete, or patch to do other functions
    res.send('This is home (backend)');
});


//connect to DB
mongoose.set('useUnifiedTopology', true);
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true }, 
    () => console.log('connected to DB!')//remove later
);


app.listen(9000);
