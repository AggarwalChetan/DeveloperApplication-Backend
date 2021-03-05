const express = require('express');
const app = express();
const developersObj = require('./backend/src/developers');

// To define the port
const port = process.env.PORT || 3100;

// To work on the response in json
app.use(express.json());

// To work on developers
app.use(developersObj);

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});