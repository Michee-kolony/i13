const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
user: 'micheekolony71@gmail.com',
pass: '1708Roosevelt'
}
});
module.exports = transporter;