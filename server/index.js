"use strict";

const express = require('express');
const app = express();

//everything in public folder should get served
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('/index.html');
});


//kick off the server
const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log('hello world! at port ' + port);
})