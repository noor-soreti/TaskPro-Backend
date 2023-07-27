const express = require('express')

const userModel = require('../model/User')

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

module.exports = app