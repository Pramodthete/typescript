
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

  findContactByName(firstName: string, lastName: string): Contact | undefined {
    return this.contacts.find(
      contact => contact.firstName === firstName && contact.lastName === lastName
    );
  }

  editContact(
    firstName: string,
    lastName: string,
    updatedDetails: Partial<Contact>
  ): boolean {
    const contact = this.findContactByName(firstName, lastName);
    if (contact) {
      Object.assign(contact, updatedDetails);
      return true;
    }
    return false;
  }
}
