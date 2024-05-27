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
        this.addressBook = new AddressBook_1.AddressBook();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    addNewContact() {
        this.rl.question('First Name: ', firstName => {
            this.rl.question('Last Name: ', lastName => {
                this.rl.question('Address: ', address => {
                    this.rl.question('City: ', city => {
                        this.rl.question('State: ', state => {
                            this.rl.question('ZIP: ', zip => {
                                this.rl.question('Phone Number: ', phoneNumber => {
                                    this.rl.question('Email: ', email => {
                                        const contact = new Contact_1.Contact(firstName, lastName, address, city, state, zip, phoneNumber, email);
                                        this.addressBook.addContact(contact);
                                        console.log('Contact added successfully.');
                                        this.listOrAdd();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
    editContact() {
        this.rl.question('Enter the first name of the contact you want to edit: ', firstName => {
            this.rl.question('Enter the last name of the contact you want to edit: ', lastName => {
                const contact = this.addressBook.findContactByName(firstName, lastName);
                if (!contact) {
                    console.log('Contact not found.');
                    this.listOrAdd();
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
                                        const success = this.addressBook.editContact(firstName, lastName, updatedDetails);
                                        if (success) {
                                            console.log('Contact updated successfully.');
                                        }
                                        else {
                                            console.log('Failed to update contact.');
                                        }
                                        this.listOrAdd();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
    deleteContact() {
        this.rl.question('Enter the first name of the contact you want to delete: ', firstName => {
            this.rl.question('Enter the last name of the contact you want to delete: ', lastName => {
                const success = this.addressBook.deleteContact(firstName, lastName);
                if (success) {
                    console.log('Contact deleted successfully.');
                }
                else {
                    console.log('Contact not found.');
                }
                this.listOrAdd();
            });
        });
    }
    listOrAdd() {
        this.rl.question('To add a new contact: a, \nEdit an existing contact: e, \nList all contacts: l \nDelete contact by name: d \nType an option: ', answer => {
            if (answer.toLowerCase() === 'a') {
                this.addNewContact();
            }
            else if (answer.toLowerCase() === 'e') {
                this.editContact();
            }
            else if (answer.toLowerCase() === 'd') {
                this.deleteContact();
            }
            else if (answer.toLowerCase() === 'l') {
                this.addressBook.listContacts();
                this.rl.close();
            }
            else {
                console.log('Invalid option.');
                this.listOrAdd();
            }
        });
    }
    start() {
        this.listOrAdd();
    }
}
exports.default = AddressBookApp;
