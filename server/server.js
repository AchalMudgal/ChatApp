const path = require('path');
const express = require("express");
var app = express();

const port = process.env.PORT || 8000
const publicPath = path.join(__dirname, '/../public');
console.log(publicPath);
app.use(express.static(publicPath));

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`);
});