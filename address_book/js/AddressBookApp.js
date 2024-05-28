"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const AddressBook_1 = require("./models/AddressBook");
const Contact_1 = require("./models/Contact");
const readline = __importStar(require("readline"));
class AddressBookApp {
    constructor() {
        this.addressBooks = new Map();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    addNewAddressBook() {
        this.rl.question('Enter a unique name for the new address book: ', name => {
            if (this.addressBooks.has(name)) {
                console.log('An address book with this name already exists.');
            }
            else {
                this.addressBooks.set(name, new AddressBook_1.AddressBook());
                console.log(`Address book '${name}' created successfully.`);
            }
            this.listOrAddAddressBook();
        });
    }
    selectAddressBook(callback) {
        this.rl.question('Enter the name of the address book you want to select: ', name => {
            const addressBook = this.addressBooks.get(name);
            if (addressBook) {
                callback(addressBook);
            }
            else {
                console.log('Address book not found.');
                this.listOrAddAddressBook();
            }
        });
    }
    addNewContact(addressBook) {
        this.rl.question('First Name: ', firstName => {
            this.rl.question('Last Name: ', lastName => {
                if (addressBook.findContactByName(firstName, lastName)) {
                    console.log('A contact with this name already exists.');
                    this.rl.question('Do you want to add another contact? (y/n): ', answer => {
                        if (answer.toLowerCase() === 'y') {
                            this.addNewContact(addressBook);
                        }
                        else {
                            this.listOrAddAddressBook();
                        }
                    });
                }
                else {
                    this.rl.question('Address: ', address => {
                        this.rl.question('City: ', city => {
                            this.rl.question('State: ', state => {
                                this.rl.question('ZIP: ', zip => {
                                    this.rl.question('Phone Number: ', phoneNumber => {
                                        this.rl.question('Email: ', email => {
                                            const contact = new Contact_1.Contact(firstName, lastName, address, city, state, zip, phoneNumber, email);
                                            addressBook.addContact(contact);
                                            console.log('Contact added successfully.');
                                            this.rl.question('Do you want to add another contact? (y/n): ', answer => {
                                                if (answer.toLowerCase() === 'y') {
                                                    this.addNewContact(addressBook);
                                                }
                                                else {
                                                    this.listOrAddAddressBook();
                                                }
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
            });
        });
    }
    editContact(addressBook) {
        this.rl.question('Enter the first name of the contact you want to edit: ', firstName => {
            this.rl.question('Enter the last name of the contact you want to edit: ', lastName => {
                const contact = addressBook.findContactByName(firstName, lastName);
                if (!contact) {
                    console.log('Contact not found.');
                    this.listOrAddAddressBook();
                    return;
                }
                console.log(`Editing contact: ${contact.toString()}`);
                this.rl.question('New Address (leave blank to keep current): ', address => {
                    this.rl.question('New City (leave blank to keep current): ', city => {
                        this.rl.question('New State (leave blank to keep current): ', state => {
                            this.rl.question('New ZIP (leave blank to keep current): ', zip => {
                                this.rl.question('New Phone Number (leave blank to keep current): ', phoneNumber => {
                                    this.rl.question('New Email (leave blank to keep current): ', email => {
                                        const updatedDetails = {};
                                        if (address)
                                            updatedDetails.address = address;
                                        if (city)
                                            updatedDetails.city = city;
                                        if (state)
                                            updatedDetails.state = state;
                                        if (zip)
                                            updatedDetails.zip = zip;
                                        if (phoneNumber)
                                            updatedDetails.phoneNumber = phoneNumber;
                                        if (email)
                                            updatedDetails.email = email;
                                        const success = addressBook.editContact(firstName, lastName, updatedDetails);
                                        if (success) {
                                            console.log('Contact updated successfully.');
                                        }
                                        else {
                                            console.log('Failed to update contact.');
                                        }
                                        this.listOrAddAddressBook();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
    deleteContact(addressBook) {
        this.rl.question('Enter the first name of the contact you want to delete: ', firstName => {
            this.rl.question('Enter the last name of the contact you want to delete: ', lastName => {
                const success = addressBook.deleteContact(firstName, lastName);
                if (success) {
                    console.log('Contact deleted successfully.');
                }
                else {
                    console.log('Contact not found.');
                }
                this.listOrAddAddressBook();
            });
        });
    }
    viewPersonsByCityOrState() {
        this.rl.question('Do you want to view persons by city(c) or state(s) ', searchBy => {
            if (searchBy.toLowerCase() === 'c') {
                this.rl.question('Enter the city: ', city => {
                    const results = this.searchContactsByCity(city);
                    this.displaySearchResults(results);
                    this.listOrAddAddressBook();
                });
            }
            else if (searchBy.toLowerCase() === 's') {
                this.rl.question('Enter the state: ', state => {
                    const results = this.searchContactsByState(state);
                    this.displaySearchResults(results);
                    this.listOrAddAddressBook();
                });
            }
            else {
                console.log('Invalid option.');
                this.listOrAddAddressBook();
            }
        });
    }
    searchContactsByCity(city) {
        console.log("------------->", city);
        const results = [];
        this.addressBooks.forEach(addressBook => {
            results.push(...addressBook.getContactsByCity(city));
        });
        return results;
    }
    searchContactsByState(state) {
        const results = [];
        this.addressBooks.forEach(addressBook => {
            results.push(...addressBook.getContactsByState(state));
        });
        return results;
    }
    searchByCityOrState() {
        this.rl.question('Do you want to search by city (c) or state (s)? ', searchBy => {
            if (searchBy.toLowerCase() === 'c') {
                this.rl.question('Enter the city to search for: ', city => {
                    const results = this.searchContacts(contact => contact.city.toLowerCase() === city.toLowerCase());
                    this.displaySearchResults(results);
                    this.listOrAddAddressBook();
                });
            }
            else if (searchBy.toLowerCase() === 's') {
                this.rl.question('Enter the state to search for: ', state => {
                    const results = this.searchContacts(contact => contact.state.toLowerCase() === state.toLowerCase());
                    this.displaySearchResults(results);
                    this.listOrAddAddressBook();
                });
            }
            else {
                console.log('Invalid option.');
                this.listOrAddAddressBook();
            }
        });
    }
    searchContacts(predicate) {
        const results = [];
        this.addressBooks.forEach(addressBook => {
            addressBook.getContacts().forEach(contact => {
                if (predicate(contact)) {
                    results.push(contact);
                }
            });
        });
        return results;
    }
    displaySearchResults(contacts) {
        if (contacts.length === 0) {
            console.log('No contacts found.');
        }
        else {
            console.log('Search results:');
            contacts.forEach(contact => console.log(contact.toString()));
        }
    }
    viewCountsByCityOrState() {
        this.rl.question('Do you want to view counts by city (c) or state (s) ', countBy => {
            if (countBy.toLowerCase() === 'c') {
                this.rl.question('Enter the city: ', city => {
                    const count = this.getCountByCity(city);
                    console.log(`Number of contacts in ${city}: ${count}`);
                    this.listOrAddAddressBook();
                });
            }
            else if (countBy.toLowerCase() === 's') {
                this.rl.question('Enter the state: ', state => {
                    const count = this.getCountByState(state);
                    console.log(`Number of contacts in ${state}: ${count}`);
                    this.listOrAddAddressBook();
                });
            }
            else {
                console.log('Invalid option.');
                this.listOrAddAddressBook();
            }
        });
    }
    getCountByCity(city) {
        let count = 0;
        this.addressBooks.forEach(addressBook => {
            count += addressBook.getCountByCity(city);
        });
        return count;
    }
    getCountByState(state) {
        let count = 0;
        this.addressBooks.forEach(addressBook => {
            count += addressBook.getCountByState(state);
        });
        return count;
    }
    displayContacts(contacts) {
        contacts.forEach(contact => console.log(contact.toString()));
    }
    listOrAddAddressBook() {
        this.rl.question('To Create a new address book: cr, \nSelect an existing address book: sl, \nSearch By city or state: sr, \nView by city or state: v, \nSort the persons (by City: sc, State: ss, ZIP: sz): s, \nView number of contacts by city or state: n, \nQuit: q, \nType Your option: ', answer => {
            if (answer.toLowerCase() === 'cr') {
                this.addNewAddressBook();
            }
            else if (answer.toLowerCase() === 'sl') {
                this.selectAddressBook(addressBook => {
                    this.listOrAdd(addressBook);
                });
            }
            else if (answer.toLowerCase() === 'sr') {
                this.searchByCityOrState();
            }
            else if (answer.toLowerCase() === 'v') {
                this.viewPersonsByCityOrState();
            }
            else if (answer.toLowerCase() === 'n') {
                this.viewCountsByCityOrState();
            }
            else if (answer.toLowerCase() === 's') {
                this.rl.question('Enter sorting criteria (c for City, s for State, z for ZIP): ', criteria => {
                    if (criteria.toLowerCase() === 'c') {
                        this.sortAndDisplayContactsByCity();
                    }
                    else if (criteria.toLowerCase() === 's') {
                        this.sortAndDisplayContactsByState();
                    }
                    else if (criteria.toLowerCase() === 'z') {
                        this.sortAndDisplayContactsByZIP();
                    }
                    else {
                        console.log('Invalid sorting criteria.');
                    }
                    this.listOrAddAddressBook();
                });
            }
            else if (answer.toLowerCase() === 'q') {
                this.rl.close();
            }
            else {
                console.log('Invalid option.');
                this.listOrAddAddressBook();
            }
        });
    }
    listOrAdd(addressBook) {
        this.rl.question('To add a new contact: a, \nEdit an existing contact: e, \nDelete a contact: d, \nList all contacts: l, \nBack to address book menu: b \nType Your option: ', answer => {
            if (answer.toLowerCase() === 'a') {
                this.addNewContact(addressBook);
            }
            else if (answer.toLowerCase() === 'e') {
                this.editContact(addressBook);
            }
            else if (answer.toLowerCase() === 'd') {
                this.deleteContact(addressBook);
            }
            else if (answer.toLowerCase() === 'l') {
                addressBook.listContacts();
                this.listOrAdd(addressBook);
            }
            else if (answer.toLowerCase() === 'b') {
                this.listOrAddAddressBook();
            }
            else {
                console.log('Invalid option.');
                this.listOrAdd(addressBook);
            }
        });
    }
    sortAndDisplayContactsByCity() {
        this.rl.question('Enter the name of the address book to sort: ', name => {
            const addressBook = this.addressBooks.get(name);
            if (addressBook) {
                const sortedContacts = addressBook.sortContactsByCity();
                this.displayContacts(sortedContacts);
                this.listOrAddAddressBook();
            }
            else {
                console.log('Address book not found.');
            }
        });
    }
    sortAndDisplayContactsByState() {
        this.rl.question('Enter the name of the address book to sort: ', name => {
            const addressBook = this.addressBooks.get(name);
            if (addressBook) {
                const sortedContacts = addressBook.sortContactsByState();
                this.displayContacts(sortedContacts);
                this.listOrAddAddressBook();
            }
            else {
                console.log('Address book not found.');
            }
        });
    }
    sortAndDisplayContactsByZIP() {
        this.rl.question('Enter the name of the address book to sort: ', name => {
            const addressBook = this.addressBooks.get(name);
            if (addressBook) {
                const sortedContacts = addressBook.sortContactsByZip();
                this.displayContacts(sortedContacts);
                this.listOrAddAddressBook();
            }
            else {
                console.log('Address book not found.');
            }
        });
    }
    start() {
        this.listOrAddAddressBook();
    }
}
exports.default = AddressBookApp;
