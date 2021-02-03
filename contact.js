const fs = require("fs")

const extra_students = JSON.parse(fs.readFileSync("./extra_students.json"));

const contacts = extra_students.map(email => {
    const [name, ] = email.split("20@");
    const [first, last] = name.split(".");
    return {
        "firstName": first,
        "lastName": last,
        "email": email
    }
})

fs.writeFileSync("extra_contacts.json", JSON.stringify(contacts))