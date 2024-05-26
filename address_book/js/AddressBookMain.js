"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AddressBookApp_1 = __importDefault(require("./AddressBookApp"));
console.log("Welcome to Address Book !!!");
const app = new AddressBookApp_1.default();
app.start();
