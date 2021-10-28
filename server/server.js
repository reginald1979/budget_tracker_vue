const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.set('debug', true);
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log('MongoDB database connection successful...')
});

const userRouter = require('./routes/users.js');
const budgetRouter = require('./routes/budget.js');

app.use('/users', userRouter);
app.use('/budgetlines', budgetRouter);

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})