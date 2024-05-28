
import { AddressBook } from './models/AddressBook';
import { Contact } from './models/Contact';
import * as readline from 'readline';

class AddressBookApp {
  private addressBooks: Map<string, AddressBook>;
  private rl: readline.Interface;

  constructor() {
    this.addressBooks = new Map<string, AddressBook>();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  private addNewAddressBook(): void {
    this.rl.question('Enter a unique name for the new address book: ', name => {
      if (this.addressBooks.has(name)) {
        console.log('An address book with this name already exists.');
      } else {
        this.addressBooks.set(name, new AddressBook());
        console.log(`Address book '${name}' created successfully.`);
      }
      this.listOrAddAddressBook();
    });
  }

  private selectAddressBook(callback: (addressBook: AddressBook) => void): void {
    this.rl.question('Enter the name of the address book you want to select: ', name => {
      const addressBook = this.addressBooks.get(name);
      if (addressBook) {
        callback(addressBook);
      } else {
        console.log('Address book not found.');
        this.listOrAddAddressBook();
      }
    });
  }

  private addNewContact(addressBook: AddressBook): void {
    this.rl.question('First Name: ', firstName => {
      this.rl.question('Last Name: ', lastName => {
        if (addressBook.findContactByName(firstName, lastName)) {
          console.log('A contact with this name already exists.');
          this.rl.question('Do you want to add another contact? (y/n): ', answer => {
            if (answer.toLowerCase() === 'y') {
              this.addNewContact(addressBook);
            } else {
              this.listOrAddAddressBook();
            }
          });
        } else {
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
                      addressBook.addContact(contact);
                      console.log('Contact added successfully.');
                      this.rl.question('Do you want to add another contact? (y/n): ', answer => {
                        if (answer.toLowerCase() === 'y') {
                          this.addNewContact(addressBook);
                        } else {
                          this.listOrAddAddressBook();
                        }
                      });
                    });
                  });
                });
              });
            });
          });
        }
      });
    });
  }

  private editContact(addressBook: AddressBook): void {
    this.rl.question('Enter the first name of the contact you want to edit: ', firstName => {
      this.rl.question('Enter the last name of the contact you want to edit: ', lastName => {
        const contact = addressBook.findContactByName(firstName, lastName);
        if (!contact) {
          console.log('Contact not found.');
          this.listOrAddAddressBook();
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

                    const success = addressBook.editContact(firstName, lastName, updatedDetails);
                    if (success) {
                      console.log('Contact updated successfully.');
                    } else {
                      console.log('Failed to update contact.');
                    }
                    this.listOrAddAddressBook();
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  private deleteContact(addressBook: AddressBook): void {
    this.rl.question('Enter the first name of the contact you want to delete: ', firstName => {
      this.rl.question('Enter the last name of the contact you want to delete: ', lastName => {
        const success = addressBook.deleteContact(firstName, lastName);
        if (success) {
          console.log('Contact deleted successfully.');
        } else {
          console.log('Contact not found.');
        }
        this.listOrAddAddressBook();
      });
    });
  }

  private viewPersonsByCityOrState(): void {
    this.rl.question('Do you want to view persons by city(c) or state(s) ', searchBy => {
      if (searchBy.toLowerCase() === 'c') {
        this.rl.question('Enter the city: ', city => {
          const results = this.searchContactsByCity(city);
          this.displaySearchResults(results);
          this.listOrAddAddressBook();
        });
      } else if (searchBy.toLowerCase() === 's') {
        this.rl.question('Enter the state: ', state => {
          const results = this.searchContactsByState(state);
          this.displaySearchResults(results);
          this.listOrAddAddressBook();
        });
      } else {
        console.log('Invalid option.');
        this.listOrAddAddressBook();
      }
    });
  }

  private searchContactsByCity(city: string): Contact[] {
    console.log("------------->",city);
    const results: Contact[] = [];
    this.addressBooks.forEach(addressBook => {
      results.push(...addressBook.getContactsByCity(city));
    });
    return results;
  }

  private searchContactsByState(state: string): Contact[] {
    const results: Contact[] = [];
    this.addressBooks.forEach(addressBook => {
      results.push(...addressBook.getContactsByState(state));
    });
    return results;
  }


  private searchByCityOrState(): void {
    this.rl.question('Do you want to search by city (c) or state (s)? ', searchBy => {
      if (searchBy.toLowerCase() === 'c') {
        this.rl.question('Enter the city to search for: ', city => {
          const results = this.searchContacts(contact => contact.city.toLowerCase() === city.toLowerCase());
          this.displaySearchResults(results);
          this.listOrAddAddressBook();
        });
      } else if (searchBy.toLowerCase() === 's') {
        this.rl.question('Enter the state to search for: ', state => {
          const results = this.searchContacts(contact => contact.state.toLowerCase() === state.toLowerCase());
          this.displaySearchResults(results);
          this.listOrAddAddressBook();
        });
      } else {
        console.log('Invalid option.');
        this.listOrAddAddressBook();
      }
    });
  }

  private searchContacts(predicate: (contact: Contact) => boolean): Contact[] {
    const results: Contact[] = [];
    this.addressBooks.forEach(addressBook => {
      addressBook.getContacts().forEach(contact => {
        if (predicate(contact)) {
          results.push(contact);
        }
      });
    });
    return results;
  }

  private displaySearchResults(contacts: Contact[]): void {
    if (contacts.length === 0) {
      console.log('No contacts found.');
    } else {
      console.log('Search results:');
      contacts.forEach(contact => console.log(contact.toString()));
    }
  }

  private viewCountsByCityOrState(): void {
    this.rl.question('Do you want to view counts by city (c) or state (s) ', countBy => {
      if (countBy.toLowerCase() === 'c') {
        this.rl.question('Enter the city: ', city => {
          const count = this.getCountByCity(city);
          console.log(`Number of contacts in ${city}: ${count}`);
          this.listOrAddAddressBook();
        });
      } else if (countBy.toLowerCase() === 's') {
        this.rl.question('Enter the state: ', state => {
          const count = this.getCountByState(state);
          console.log(`Number of contacts in ${state}: ${count}`);
          this.listOrAddAddressBook();
        });
      } else {
        console.log('Invalid option.');
        this.listOrAddAddressBook();
      }
    });
  }

  private getCountByCity(city: string): number {
    let count = 0;
    this.addressBooks.forEach(addressBook => {
      count += addressBook.getCountByCity(city);
    });
    return count;
  }

  private getCountByState(state: string): number {
    let count = 0;
    this.addressBooks.forEach(addressBook => {
      count += addressBook.getCountByState(state);
    });
    return count;
  }

  private sortAndDisplayContacts(addressBook: AddressBook): void {
    const sortedContacts = addressBook.sortContactsByName();
    console.log('Sorted contacts:');
    sortedContacts.forEach(contact => console.log(contact.toString()));
  }

  private listOrAddAddressBook(): void {
    this.rl.question('To Create a new address book: cr, \nSelect an existing address book: sl, \nSearch By city or state: sr, \nView by city or state: v, \nSort the persons: a, \nView number of contacts by city or state: n, \nQuit: q, \nType Your option: ', answer => {
      if (answer.toLowerCase() === 'cr') {
        this.addNewAddressBook();
      } else if (answer.toLowerCase() === 'sl') {
        this.selectAddressBook(addressBook => {
          this.listOrAdd(addressBook);
        });
      } else if (answer.toLowerCase() === 'sr') {
        this.searchByCityOrState();
      }else if (answer.toLowerCase() === 'v') {
        this.viewPersonsByCityOrState();
      } else if (answer.toLowerCase() === 'n') {
        this.viewCountsByCityOrState();
      }else if (answer.toLowerCase() === 'a') {
        this.rl.question('Enter the name of the address book to sort: ', name => {
          const addressBook = this.addressBooks.get(name);
          if (addressBook) {
            this.sortAndDisplayContacts(addressBook);
          } else {
            console.log('Address book not found.');
          }
          this.listOrAddAddressBook();
        });
      }else if (answer.toLowerCase() === 'q') {
        this.rl.close();
      } else {
        console.log('Invalid option.');
        this.listOrAddAddressBook();
      }
    });
  }

  private listOrAdd(addressBook: AddressBook): void {
    this.rl.question('To add a new contact: a, \nEdit an existing contact: e, \nDelete a contact: d, \nList all contacts: l, \nBack to address book menu: b \nType Your option: ', answer => {
      if (answer.toLowerCase() === 'a') {
        this.addNewContact(addressBook);
      } else if (answer.toLowerCase() === 'e') {
        this.editContact(addressBook);
      } else if (answer.toLowerCase() === 'd') {
        this.deleteContact(addressBook);
      } else if (answer.toLowerCase() === 'l') {
        addressBook.listContacts();
        this.listOrAdd(addressBook);
      } else if (answer.toLowerCase() === 'b') {
        this.listOrAddAddressBook();
      } else {
        console.log('Invalid option.');
        this.listOrAdd(addressBook);
      }
    });
  }

  public start(): void {
    this.listOrAddAddressBook();
  }
}

export default AddressBookApp;
