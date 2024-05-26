"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressBook = void 0;
class AddressBook {
    constructor() {
        this.contacts = [];
    }
    addContact(contact) {
        this.contacts.push(contact);
    }
    listContacts() {
        this.contacts.forEach(contact => {
            console.log(contact.toString());
        });
    }
}
exports.AddressBook = AddressBook;
