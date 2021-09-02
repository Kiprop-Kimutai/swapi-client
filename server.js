const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'))
});
var server = app.listen(process.env.PORT || 2001, () => {
    console.log(`server listening at port ${server.address().port}`);
});