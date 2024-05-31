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
const readline = __importStar(require("readline"));
const fs = __importStar(require("fs"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Function to take user input for name and age
function takeUserInput() {
    rl.question('Enter your name: ', (name) => {
        rl.question('Enter your age: ', (age) => {
            const userData = { name, age };
            const userDataString = JSON.stringify(userData, null, 2);
            // Append user data to a text file
            fs.appendFile('userData.txt', userDataString + '\n', (err) => {
                if (err) {
                    console.error('Error appending to file:', err);
                }
                else {
                    console.log('User data appended to userData.txt');
                }
                rl.close();
            });
        });
    });
}
// Call the function to take user input
takeUserInput();
