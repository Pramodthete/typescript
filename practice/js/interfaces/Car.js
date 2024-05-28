"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sedan = void 0;
class Sedan {
    constructor(name, model, year, color) {
        this.name = name;
        this.model = model;
        this.year = year;
        this.color = color;
    }
    startEngine() {
        console.log("Engine started");
    }
    stopEngine() {
        console.log("Engine stopped");
    }
    drive(distance) {
        console.log(`Driving ${distance} kilometers`);
    }
    getCarInfo() {
        return `Car Info: ${this.year} ${this.name} ${this.model}${this.color ? `, Color: ${this.color}` : ''}`;
    }
}
exports.Sedan = Sedan;
