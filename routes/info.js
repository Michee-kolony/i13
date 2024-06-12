const express = require('express');
const router = express.Router();
const Information = require('../models/info');
const { getall, publie, getone, deleteone, modifyone } = require('../controllers/info');


//route post
router.post('/informations',publie);
 
 //route get
router.get('/',getall);
 
 //route find one
router.get('/:id', getone);
 
 //route delete
router.delete('/:id',deleteone)
 
 //modifier une information
router.put('/:id', modifyone)

 module.exports = router;