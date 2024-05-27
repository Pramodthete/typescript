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
    findContactByName(firstName, lastName) {
        return this.contacts.find(contact => contact.firstName === firstName && contact.lastName === lastName);
    }
    editContact(firstName, lastName, updatedDetails) {
        const contact = this.findContactByName(firstName, lastName);
        if (contact) {
            Object.assign(contact, updatedDetails);
            return true;
        }
        return false;
    }
    deleteContact(firstName, lastName) {
        const index = this.contacts.findIndex(contact => contact.firstName === firstName && contact.lastName === lastName);
        if (index !== -1) {
            this.contacts.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.AddressBook = AddressBook;
