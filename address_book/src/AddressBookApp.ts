
import { AddressBook } from './models/AddressBook';
import { Contact } from './models/Contact';
import * as readline from 'readline';

class AddressBookApp {
  private addressBook: AddressBook;
  private rl: readline.Interface;

  constructor() {
    this.addressBook = new AddressBook();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  private addNewContact(): void {
    this.rl.question('First Name: ', firstName => {
      this.rl.question('Last Name: ', lastName => {
        this.rl.question('Address: ', address => {
          this.rl.question('City: ', city => {
            this.rl.question('State: ', state => {
              this.rl.question('ZIP: ', zip => {
                this.rl.question('Phone Number: ', phoneNumber => {
                  this.rl.question('Email: ', email => {
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
                    if (this.addressBook.addContact(contact)) {
                      console.log('Contact added successfully.');
                    } else {
                      console.log('Contact already exists.');
                    }
                    this.rl.question('Do you want to add another contact? (y/n): ', answer => {
                      if (answer.toLowerCase() === 'y') {
                        this.addNewContact();
                      } else {
                        this.listOrAdd();
                      }
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  private editContact(): void {
    this.rl.question('Enter the first name of the contact you want to edit: ', firstName => {
      this.rl.question('Enter the last name of the contact you want to edit: ', lastName => {
        const contact = this.addressBook.findContactByName(firstName, lastName);
        if (!contact) {
          console.log('Contact not found.');
          this.listOrAdd();
          return;
        }

        console.log(`Editing contact: ${contact.toString()}`);
        this.rl.question('New Address (leave blank to keep current): ', address => {
          this.rl.question('New City (leave blank to keep current): ', city => {
            this.rl.question('New State (leave blank to keep current): ', state => {
              this.rl.question('New ZIP (leave blank to keep current): ', zip => {
                this.rl.question('New Phone Number (leave blank to keep current): ', phoneNumber => {
                  this.rl.question('New Email (leave blank to keep current): ', email => {
                    const updatedDetails: Partial<Contact> = {};
                    if (address) updatedDetails.address = address;
                    if (city) updatedDetails.city = city;
                    if (state) updatedDetails.state = state;
                    if (zip) updatedDetails.zip = zip;
                    if (phoneNumber) updatedDetails.phoneNumber = phoneNumber;
                    if (email) updatedDetails.email = email;

                    const success = this.addressBook.editContact(firstName, lastName, updatedDetails);
                    if (success) {
                      console.log('Contact updated successfully.');
                    } else {
                      console.log('Failed to update contact.');
                    }
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

  private deleteContact(): void {
    this.rl.question('Enter the first name of the contact you want to delete: ', firstName => {
      this.rl.question('Enter the last name of the contact you want to delete: ', lastName => {
        const success = this.addressBook.deleteContact(firstName, lastName);
        if (success) {
          console.log('Contact deleted successfully.');
        } else {
          console.log('Contact not found.');
        }
        this.listOrAdd();
      });
    });
  }

  private listOrAdd(): void {
    this.rl.question('To add a new contact: a, \nEdit an existing contact: e, \nList all contacts: l \nDelete contact by name: d \nType an option: ', answer => {
      if (answer.toLowerCase() === 'a') {
        this.addNewContact();
      } else if (answer.toLowerCase() === 'e') {
        this.editContact();
      } else if (answer.toLowerCase() === 'd') {
        this.deleteContact();
      } else if (answer.toLowerCase() === 'l') {
        this.addressBook.listContacts();
        this.rl.close();
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

export default AddressBookApp;
