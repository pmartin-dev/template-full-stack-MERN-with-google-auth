"use strict";
const express = require('express');
const app = express();
const PORT = process.env.NODE_ENV === "production" ? process.env.URL_PROD : 3030;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
