import { Contact } from './models/Contact';
import * as readline from 'readline';
import { AddressBook } from './models/AddressBook';

class AddressBookApp {
  private input: readline.Interface;
  private addressBook: AddressBook;

  constructor() {
    this.addressBook = new AddressBook();
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
                    this.addressBook.addContact(contact);
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
    this.input.question(' To Add a new contact : type \'a\' \n To List all contacts : type \'l\' \n Type Your Choice : ', answer => {
      if (answer.toLowerCase() === 'a') {
        this.addNewContact();
      } else if (answer.toLowerCase() === 'l') {
        this.addressBook.listContacts();
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
