const fs = require('fs').promises
const path = require('path')
const { nanoid } = require('nanoid')

const contactsPath = path.resolve('./db/contacts.json')

// TODO: задокументировать каждую функцию
function listContacts() {
    fs.readFile(contactsPath)
        .then((data) => console.table(JSON.parse(data)))
        .catch(console.error)
}

function getContactById(contactId) {
    fs.readFile(contactsPath)
        .then((data) =>
            console.table(JSON.parse(data).find(({ id }) => id === contactId))
        )
        .catch(console.error)
}

function removeContact(contactId) {
    fs.readFile(contactsPath)
        .then((data) =>
            JSON.parse(data).filter((data) => data.id !== contactId)
        )
        .then((data) => {
            fs.writeFile(contactsPath, JSON.stringify(data))
            listContacts()
        })
        .catch(console.error)
}

function addContact(name, email, phone) {
    const newContact = {
        id: nanoid(),
        name: name,
        email: email,
        phone: phone,
    }
    fs.readFile(contactsPath)
        .then((data) => {
            let list = JSON.parse(data)
            list.push(newContact)
            fs.writeFile(contactsPath, JSON.stringify(list), 'utf8')
            listContacts()
        })
        .catch(console.error)
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}
