var nodemailer = require('nodemailer');
const fs = require('fs');

contacts = JSON.parse(fs.readFileSync("dummy.json"));
text = fs.readFileSync("template.html").toString();

let { user, password } = require('./config')

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: user,
        pass: password
    }
});

for (let i = 0; i < contacts.length; i++) {

    let html = text.replace("{{firstName}}", contacts[i].firstName);
    html = html.replace("{{lastName}}", contacts[i].lastName);
    let subject = `Hey ${contacts[i].firstName} ${contacts[i].lastName}! You are invited to First Year Telegram Group.`;
    
    var mailOptions = {
        from: 'omkar.bhale@pccoepune.org',
        to: contacts[i].email,
        subject: subject,
        html: html
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            
            console.log(`${i+1}th Email sent to ${contacts[i].email}, ${(i+1)/contacts.length*100}% complete!`);
        }
    });
}