require("dotenv").config();
const express = require('express');
const carDescription = require('./car_description');
const carComparison = require('./car_comparison');
const confidence = require('./confidence_analysis');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/carDescription',carDescription);
app.use('/carComparison',carComparison);
app.use('/confidenceAnalysis',confidence);

app.get("/", function (req, res) {
    res.json({ success: "hello world" },)
})

app.listen(port,
    () => console.log(`App listening on port ${port}`
    ))