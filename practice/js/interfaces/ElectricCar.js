"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tesla = void 0;
class Tesla {
    constructor(name, model, year, batteryCapacity, color) {
        this.name = name;
        this.model = model;
        this.year = year;
        this.batteryCapacity = batteryCapacity;
        this.color = color;
    }
    startEngine() {
        console.log("Electric motor started");
    }
    stopEngine() {
        console.log("Electric motor stopped");
    }
    drive(distance) {
        console.log(`Driving ${distance} kilometers on electric power`);
    }
    getCarInfo() {
        return `Car Info: ${this.year} ${this.name} ${this.model}, Battery: ${this.batteryCapacity} kWh${this.color ? `, Color: ${this.color}` : ''}`;
    }
    chargeBattery(amount) {
        console.log(`Charging battery by ${amount} kWh`);
    }
}
exports.Tesla = Tesla;
