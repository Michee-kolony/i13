const Freelancer = require('../models/freelancers');

exports.savefree= (req, res, next)=>{
    delete req.body._id;
        const free = new Freelancer({
          ...req.body
        });
        free.save()
        .then(()=>res.status(201).json({message : "Freelancers enregistré"}))
        .catch(error=>res.status(500).json({error : error})); 
 }

 exports.getfree= (req, res, next)=>{
    Freelancer.find()
    .then(informations => res.status(200).json(informations))
    .catch(error => res.status(400).json({error : error}));
 }

 exports.getonefree = (req, res, next) => {
    Freelancer.findOne({_id:req.params.id})
    .then(informations => res.status(200).json(informations))
    .catch(error => res.status(400).json({error : error}));
 }

 exports.deleteonefree = (req, res, next)=>{
    Freelancer.deleteOne({_id:req.params.id})
   .then(()=>res.status(200).json({message : "Freelancer supprimé"}))
   .catch(error => res.status(400).json({error : error}));
 }
 exports.modifyonefree = (req, res, next) => {
    Freelancer.updateOne({_id:req.params.id}, {...req.body, _id:req.params.id})
   .then(()=>res.status(200).json({message : "Freelancer modifiée"}))
   .catch(error => res.status(400).json({error : error}));
 }