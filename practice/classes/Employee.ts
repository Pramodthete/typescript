import {User} from './User';
class Employee extends User{
    private employeeId:number;

    constructor(firstName:string,lastName:string,age:number,employeeId:number){
        super(firstName,lastName,age);
        this.employeeId = employeeId;
    }

    public getEmployeeId():number{
        return this.employeeId;
    }

    public getDetails():string{
        return `Employee Id: ${this.employeeId}, Name:${this.getFullName()}, Age:${this.getAge()}`
    }
}

const employee1 = new Employee('Pramod','Thete',24,101);

console.log(employee1.getDetails());