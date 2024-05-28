
export interface Car{
    name:string;
    model:string;
    year:number;
    color?:string; //optional property

    startEngine():void;
    stopEngine():void;
    drive(distance:number):void;
    getCarInfo():string;
}

export class Sedan implements Car {
    constructor(
      public name: string,
      public model: string,
      public year: number,
      public color?: string
    ) {}
  
    startEngine(): void {
      console.log("Engine started");
    }
  
    stopEngine(): void {
      console.log("Engine stopped");
    }
  
    drive(distance: number): void {
      console.log(`Driving ${distance} kilometers`);
    }
  
    getCarInfo(): string {
      return `Car Info: ${this.year} ${this.name} ${this.model}${this.color ? `, Color: ${this.color}` : ''}`;
    }
  }
  

