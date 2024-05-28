import { Car } from "./Car";

export interface ElectricCar extends Car{
    batteryCapacity:number;
    chargeBattery(amount:number):void;
}

export class Tesla implements ElectricCar {
  constructor(
    public name: string,
    public model: string,
    public year: number,
    public batteryCapacity: number,
    public color?: string
  ) {}

  startEngine(): void {
    console.log("Electric motor started");
  }

  stopEngine(): void {
    console.log("Electric motor stopped");
  }

  drive(distance: number): void {
    console.log(`Driving ${distance} kilometers on electric power`);
  }

  getCarInfo(): string {
    return `Car Info: ${this.year} ${this.name} ${this.model}, Battery: ${this.batteryCapacity} kWh${this.color ? `, Color: ${this.color}` : ''}`;
  }

  chargeBattery(amount: number): void {
    console.log(`Charging battery by ${amount} kWh`);
  }
}