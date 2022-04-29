const express = require('express');
const cors = require("cors")
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/User');


app.use(cookieParser());
app.use(express.json());

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/DBNAME',{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },()=>{
    console.log('successfully connected to database');
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

app.use(cors());
app.use('/user',userRouter);


app.listen(5000,()=>{
    console.log('express server started');
});
