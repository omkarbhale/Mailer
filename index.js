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
        from: user,
        to: contacts[i].email,
        subject: subject,
        html: html
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            fs.appendFileSync("log.txt", `\n\n${i}\n${contacts[i].email}\n${subject}\n${html}\n\n`, () => {})
            console.log(`${i+1}th Email sent to ${contacts[i].email}`);
        }
    });
}
