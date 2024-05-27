"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressBook = void 0;
class AddressBook {
    constructor() {
        this.contacts = new Set();
    }
    addContact(contact) {
        if (this.contacts.has(contact)) {
            return false;
        }
        this.contacts.add(contact);
        return true;
    }
    listContacts() {
        this.contacts.forEach(contact => {
            console.log(contact.toString());
        });
    }
    findContactByName(firstName, lastName) {
        for (let contact of this.contacts) {
            if (contact.firstName.toLowerCase() === firstName.toLowerCase() && contact.lastName.toLowerCase() === lastName.toLowerCase()) {
                return contact;
            }
        }
        return undefined;
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
        const contact = this.findContactByName(firstName, lastName);
        if (contact) {
            this.contacts.delete(contact);
            return true;
        }
        return false;
    }
}
exports.AddressBook = AddressBook;
