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
const Contact_1 = require("./models/Contact");
const readline = __importStar(require("readline"));
class AddressBookApp {
    constructor() {
        this.input = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    addNewContact() {
        this.input.question('First Name: ', firstName => {
            this.input.question('Last Name: ', lastName => {
                this.input.question('Address: ', address => {
                    this.input.question('City: ', city => {
                        this.input.question('State: ', state => {
                            this.input.question('ZIP: ', zip => {
                                this.input.question('Phone Number: ', phoneNumber => {
                                    this.input.question('Email: ', email => {
                                        const contact = new Contact_1.Contact(firstName, lastName, address, city, state, zip, phoneNumber, email);
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
    listOrAdd() {
        this.input.question(' To Add a new contact : type \'a\' \n To List all contacts : type \'l\' \n To exit type any character : \n Type Your Choice : ', answer => {
            if (answer.toLowerCase() === 'a') {
                this.addNewContact();
            }
            else if (answer.toLowerCase() === 'l') {
                console.log(Contact_1.Contact);
                this.input.close();
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
// Export the AddressBookApp class
exports.default = AddressBookApp;
