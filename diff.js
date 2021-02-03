const fs = require("fs")

const new_list = JSON.parse(fs.readFileSync("./new-list.json"));
const old_list = JSON.parse(fs.readFileSync("./email.json"));

const extra_students = new_list.filter(email => {
    if (old_list.indexOf(email) === -1) {
        return true
    }
    return false
})

fs.writeFileSync("extra_students.json", JSON.stringify(extra_students))