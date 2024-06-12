const Information = require('../models/info');


exports.getall= (req, res, next)=>{
    Information.find()
    .then(informations => res.status(200).json(informations))
    .catch(error => res.status(400).json({error : error}));
 }

exports.publie = (req, res, next)=>{
    delete req.body._id;
        const info = new Information({
          ...req.body
        });
        info.save()
        .then(()=>res.status(201).json({message : "Information publiée"}))
        .catch(error=>res.status(500).json({error : error})); 
 }

 exports.getone = (req, res, next) => {
    Information.findOne({_id:req.params.id})
    .then(informations => res.status(200).json(informations))
    .catch(error => res.status(400).json({error : error}));
 }
 exports.deleteone = (req, res, next)=>{
    Information.deleteOne({_id:req.params.id})
   .then(()=>res.status(200).json({message : "Information supprimée"}))
   .catch(error => res.status(400).json({error : error}));
 }
 exports.modifyone = (req, res, next) => {
    Information.updateOne({_id:req.params.id}, {...req.body, _id:req.params.id})
   .then(()=>res.status(200).json({message : "Information modifiée"}))
   .catch(error => res.status(400).json({error : error}));
 }