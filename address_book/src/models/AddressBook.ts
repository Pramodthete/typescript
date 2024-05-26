// src/models/AddressBook.ts
import { Contact } from './Contact';

export class AddressBook {
  private contacts: Contact[] = [];

  addContact(contact: Contact): void {
    this.contacts.push(contact);
  }

  listContacts(): void {
    this.contacts.forEach(contact => {
      console.log(contact.toString());
    });
  }
}
