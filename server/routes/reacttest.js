const express = require('express')
const router = express.Router()
//import React from 'react';
//import { render } from 'react-dom';

//const reactTest = 

router.get('/', (req, res) => {
    res.send('hello')
})

module.exports = router