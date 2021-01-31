var nodemailer = require('nodemailer');
const fs = require('fs');

contacts = JSON.parse(fs.readFileSync("contacts.json"));
text = fs.readFileSync("template.html").toString();

let { user, password } = require('./config')

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: user,
        pass: password
    }
});

async function send() {
    let remaining = [];

    for (let i = 398; i < contacts.length; i++) {

        let html = text.replace("{{firstName}}", contacts[i].firstName);
        html = html.replace("{{lastName}}", contacts[i].lastName);
        let subject = `Hey ${contacts[i].firstName} ${contacts[i].lastName}! You are invited to First Year Telegram Group.`;

        var mailOptions = {
            from: `"Suraj Jha" ${user}`,
            to: contacts[i].email,
            subject: subject,
            html: html
        };


        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         console.log(error);
        //         fs.appendFile("remaining.txt", `${contacts[i].email}\n`);
        //     } else {
        //         fs.appendFileSync("log.txt", `\n\n${i}\n${contacts[i].email}\n${subject}\n${html}\n\n`, () => {})
        //         console.log(`${i+1}th Email sent to ${contacts[i].email}`);
        //     }
        // });

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log(`${i+1}th Email sent to ${contacts[i].email} ${info.response}`);
            fs.appendFile('log1.txt', `${contacts[i].email}\n`, () => {});
        } catch (error) {
            console.log(error);
            remaining.push(contacts[i]);
        }

    }
    fs.writeFileSync("remaining.json", JSON.stringify(remaining, null, 2));
}

send();
async function a() {
    for (let i = 0; i < 1; i++) {
        var mailOptions = {
            from: `"Omkar" <${user}>`,
            to: `${i}@jhasuraj.com`,
            subject: "TEXT",
            html: text
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log(info.response);
        } catch (error) {
            console.log(error);
            remaining.push(contacts[i]);
        }

    }
}
// a();