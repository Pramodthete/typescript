
import { Sedan} from "./Car";

import { Tesla } from "./ElectricCar";

const mySedan = new Sedan('Toyota','Camry',2020,'Blue');

console.log(mySedan.getCarInfo());
mySedan.startEngine();
mySedan.drive(50);
mySedan.stopEngine();


const myTesla = new Tesla('Tesla','Model S',2021,100,'red');
console.log(myTesla.getCarInfo());
myTesla.startEngine();
myTesla.drive(100);
myTesla.chargeBattery(50);
myTesla.stopEngine();