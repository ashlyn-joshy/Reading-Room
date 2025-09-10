const express = require('express');
require('dotenv').config();


const app = express();

app.get ('/', (req, res) => {
    res.send('Hello World! This is a backend server for Reading Room application.');
    next();
});

const port = process.env.PORT || 8000;

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})