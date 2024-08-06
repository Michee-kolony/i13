
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transporter = require('../middleware/email');
const crypto = require('crypto');

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
                                    email:user.email,
                                    createdate:user.createdate
                                
                                });
                            }
                       })
                       .catch(err => res.status(400).json({error : err}));
            }
        })
        .catch()
};

exports.forgotPassword = (req, res, next) => {
    const email = req.body.email;
    User.findOne({ email: email })
    .then(user => {
    if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    const resetPin =
    crypto.randomBytes(3).toString('hex').toUpperCase();
    const resetPinExpires = Date.now() + 3600000; // 1 heure
    user.resetPin = resetPin;
    user.resetPinExpires = resetPinExpires;
    user.save()
    .then(() => {
    const mailOptions = {
    from: 'micheekolony71@gmail.com',
    to: user.email,
    subject: 'Code de réinitialisation de mot de passe',
    text: `Votre code de réinitialisation est :
    ${resetPin}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
    return res.status(500).json({ error });
    }
    res.status(200).json({ message: 'Code de réinitialisation envoyé' });
    });
    })
    .catch(err => res.status(500).json({ error: err }));
    })
    .catch(err => res.status(500).json({ error: err }));
    };

    exports.resetPassword = (req, res, next) => {
        const { email, resetPin, newPassword } = req.body;
        User.findOne({ email: email, resetPin: resetPin, resetPinExpires: { $gt:
        Date.now() } })
        .then(user => {
        if (!user) {
        return res.status(400).json({ message: 'Code PIN invalide ou expiré' });
        }
        bcrypt.hash(newPassword, 10)
        .then(hash => {
        user.password = hash;
        user.resetPin = undefined;
        user.resetPinExpires = undefined;
        user.save()
        .then(() => res.status(200).json({ message: 'Mot de passe réinitialisé avec succès' }))
        .catch(err => res.status(500).json({ error: err }));
        })
        .catch(err => res.status(500).json({ error: err }));
        })
        .catch(err => res.status(500).json({ error: err }));
        };