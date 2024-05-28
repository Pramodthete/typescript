"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    getAge() {
        return this.age;
    }
    setAge(age) {
        if (age > 0) {
            this.age = age;
        }
        else {
            console.log("Age must be Positive");
        }
    }
}
exports.User = User;
const user1 = new User('Pramod', 'Thete', 24);
console.log(user1.getAge());
console.log(user1.getFullName());
user1.setAge(25);
console.log(user1.getAge());
