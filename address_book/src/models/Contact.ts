
export class Contact {
    constructor(
      public firstName: string,
      public lastName: string,
      public address: string,
      public city: string,
      public state: string,
      public zip: string,
      public phoneNumber: string,
      public email: string
    ) {}
  
    toString(): string {
      return `${this.firstName} ${this.lastName}, ${this.address}, ${this.city}, ${this.state}, ${this.zip}, ${this.phoneNumber}, ${this.email}`;
    }
  }
  