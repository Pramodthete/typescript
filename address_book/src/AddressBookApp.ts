import { Contact } from './models/Contact';
import * as readline from 'readline';

class AddressBookApp {
  private input: readline.Interface;

  constructor() {
    this.input = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  private addNewContact(): void {
    this.input.question('First Name: ', firstName => {
      this.input.question('Last Name: ', lastName => {
        this.input.question('Address: ', address => {
          this.input.question('City: ', city => {
            this.input.question('State: ', state => {
              this.input.question('ZIP: ', zip => {
                this.input.question('Phone Number: ', phoneNumber => {
                  this.input.question('Email: ', email => {
                    const contact = new Contact(
                      firstName,
                      lastName,
                      address,
                      city,
                      state,
                      zip,
                      phoneNumber,
                      email
                    );
                    console.log('Contact added successfully.');
                    this.listOrAdd();
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  private listOrAdd(): void {
    this.input.question(' To Add a new contact : type \'a\' \n To List all contacts : type \'l\' \n To exit type any character : \n Type Your Choice : ', answer => {
      if (answer.toLowerCase() === 'a') {
        this.addNewContact();
      } else if (answer.toLowerCase() === 'l') {
        // console.log(Contact)
        this.input.close();
      } else {
        console.log('Invalid option.');
        this.listOrAdd();
      }
    });
  }

  public start(): void {
    this.listOrAdd();
  }
}

// Export the AddressBookApp class
export default AddressBookApp;
