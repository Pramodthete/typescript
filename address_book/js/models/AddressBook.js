"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressBook = void 0;
class AddressBook {
    constructor() {
        this.contacts = new Set();
        this.cityToContacts = new Map();
        this.stateToContacts = new Map();
    }
    addToCityAndStateMaps(contact) {
        if (!this.cityToContacts.has(contact.city)) {
            this.cityToContacts.set(contact.city, new Set());
        }
        this.cityToContacts.get(contact.city).add(contact);
        if (!this.stateToContacts.has(contact.state)) {
            this.stateToContacts.set(contact.state, new Set());
        }
        this.stateToContacts.get(contact.state).add(contact);
    }
    removeFromCityAndStateMaps(contact) {
        var _a, _b, _c, _d;
        (_a = this.cityToContacts.get(contact.city)) === null || _a === void 0 ? void 0 : _a.delete(contact);
        if (((_b = this.cityToContacts.get(contact.city)) === null || _b === void 0 ? void 0 : _b.size) === 0) {
            this.cityToContacts.delete(contact.city);
        }
        (_c = this.stateToContacts.get(contact.state)) === null || _c === void 0 ? void 0 : _c.delete(contact);
        if (((_d = this.stateToContacts.get(contact.state)) === null || _d === void 0 ? void 0 : _d.size) === 0) {
            this.stateToContacts.delete(contact.state);
        }
    }
    listContacts() {
        this.contacts.forEach(contact => {
            console.log(contact.toString());
        });
    }
    addContact(contact) {
        if (this.contacts.has(contact)) {
            return false;
        }
        this.contacts.add(contact);
        this.addToCityAndStateMaps(contact);
        return true;
    }
    editContact(firstName, lastName, updatedDetails) {
        const contact = this.findContactByName(firstName, lastName);
        if (contact) {
            this.removeFromCityAndStateMaps(contact);
            Object.assign(contact, updatedDetails);
            this.addToCityAndStateMaps(contact);
            return true;
        }
        return false;
    }
    deleteContact(firstName, lastName) {
        const contact = this.findContactByName(firstName, lastName);
        if (contact) {
            this.contacts.delete(contact);
            this.removeFromCityAndStateMaps(contact);
            return true;
        }
        return false;
    }
    getContacts() {
        return Array.from(this.contacts);
    }
    findContactByName(firstName, lastName) {
        return Array.from(this.contacts).find(contact => contact.firstName === firstName && contact.lastName === lastName);
    }
    getContactsByCity(city) {
        return Array.from(this.cityToContacts.get(city) || []);
    }
    getContactsByState(state) {
        return Array.from(this.stateToContacts.get(state) || []);
    }
}
exports.AddressBook = AddressBook;
