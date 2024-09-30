const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./Routes/userRoute');
const chatRoute = require('./Routes/chatRoute');
const messageRoute = require('./Routes/messageRoute');

const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

mongoose.connect(uri).then(()=>console.log('Mongodb connected')).catch((error) => console.log('DB not connected !',error.message));

app.use(express.json());
app.use(cors());
app.use('/api/users', userRoute);
app.use('/api/chat', chatRoute);
app.use('/api/message', messageRoute);

app.listen(port,(req,res) => {console.log(`Server running on port.. ${port}`)});




