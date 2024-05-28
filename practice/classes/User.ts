export class User {
    private firstName:string;
    private lastName:string;
    private age:number;

    constructor(firstName:string,lastName:string,age:number){
        this.firstName=firstName;
        this.lastName=lastName;
        this.age=age;
    }

    public getFullName():string{
        return `${this.firstName} ${this.lastName}`;
    }

    public getAge():number{
        return this.age;
    }

    public setAge(age:number):void{
        if(age>0){
            this.age=age;
        }else{
            console.log("Age must be Positive");
        }
    }
}

const user1= new User('Pramod','Thete',24);

console.log(user1.getAge());
console.log(user1.getFullName());

user1.setAge(25);
console.log(user1.getAge());
