import { LogClass } from "./logDecorator";

@LogClass
class Person{
    constructor(public firstName:string,public lastName:string){
        
    }

    getFullName():string{
        return `${this.firstName} ${this.lastName}`;
    }
}

const person1 = new Person('Pramod','Thete');

console.log(person1.getFullName());