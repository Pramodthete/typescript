"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
class Employee extends User_1.User {
    constructor(firstName, lastName, age, employeeId) {
        super(firstName, lastName, age);
        this.employeeId = employeeId;
    }
    getEmployeeId() {
        return this.employeeId;
    }
    getDetails() {
        return `Employee Id: ${this.employeeId}, Name:${this.getFullName()}, Age:${this.getAge()}`;
    }
}
const employee1 = new Employee('Pramod', 'Thete', 24, 101);
console.log(employee1.getDetails());
