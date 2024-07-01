
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.signup = (req, res, next)=>{
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            nom : req.body.nom,
            email : req.body.email,
            password:hash
        })
        user.save()
            .then(()=>res.status(200).json({message : 'Votre compte a bien été crée'}))
            .catch(err =>res.status(400).json({err}));
    })
    .catch(err=>{res.status(500).json({err})});
};
exports.signin = (req, res, next)=>{
    User.findOne({email:req.body.email})
        .then(user=>{
            if(user === null){
                res.status(404).json({message : "Paire de clés incorrecte"});
            }
            else{
                bcrypt.compare(req.body.password, user.password)
                       .then(valid =>{
                            if(!valid){
                            res.status(401).json({message : "Paire de clés incorrecte"});
                            }
                            else{
                                res.status(200).json({
                                    userId:user._id,
                                    Token : jwt.sign(
                                        {userId : user._id}, 
                                        'RANDOM_TOKEN_SECRET',
                                        {expiresIn : '24H'}
                                    ),
                                    nom:user.nom,
                                    email:user.email
                                
                                });
                            }
                       })
                       .catch(err => res.status(400).json({error : err}));
            }
        })
        .catch()
};