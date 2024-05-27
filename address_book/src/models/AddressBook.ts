
import { Contact } from './Contact';

export class AddressBook {
  private contacts: Set<Contact>;

  constructor() {
    this.contacts = new Set<Contact>();
  }

  addContact(contact: Contact): boolean {
    if (this.contacts.has(contact)) {
      return false;
    }
    this.contacts.add(contact);
    return true;
  }

  listContacts(): void {
    this.contacts.forEach(contact => {
      console.log(contact.toString());
    });
  }

  findContactByName(firstName: string, lastName: string): Contact | undefined {
    for (let contact of this.contacts) {
      if (contact.firstName.toLowerCase() === firstName.toLowerCase() && contact.lastName.toLowerCase() === lastName.toLowerCase()) {
        return contact;
      }
    }
    return undefined;
  }

  editContact(firstName: string,lastName: string,updatedDetails: Partial<Contact>): boolean {
    const contact = this.findContactByName(firstName, lastName);
    if (contact) {
      Object.assign(contact, updatedDetails);
      return true;
    }
    return false;
  }

  deleteContact(firstName: string, lastName: string): boolean {
    const contact = this.findContactByName(firstName, lastName);
    if (contact) {
      this.contacts.delete(contact);
      return true;
    }
    return false;
  }
}
