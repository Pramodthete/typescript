
import { Contact } from './Contact';

export class AddressBook {
  private contacts: Set<Contact>;
  private cityToContacts: Map<string, Set<Contact>>;
  private stateToContacts: Map<string, Set<Contact>>;

  constructor() {
    this.contacts = new Set<Contact>();
    this.cityToContacts = new Map<string, Set<Contact>>();
    this.stateToContacts = new Map<string, Set<Contact>>();
  }

  private addToCityAndStateMaps(contact: Contact): void {
    if (!this.cityToContacts.has(contact.city)) {
      this.cityToContacts.set(contact.city, new Set<Contact>());
    }
    this.cityToContacts.get(contact.city)!.add(contact);

    if (!this.stateToContacts.has(contact.state)) {
      this.stateToContacts.set(contact.state, new Set<Contact>());
    }
    this.stateToContacts.get(contact.state)!.add(contact);
  }

  private removeFromCityAndStateMaps(contact: Contact): void {
    this.cityToContacts.get(contact.city)?.delete(contact);
    if (this.cityToContacts.get(contact.city)?.size === 0) {
      this.cityToContacts.delete(contact.city);
    }

    this.stateToContacts.get(contact.state)?.delete(contact);
    if (this.stateToContacts.get(contact.state)?.size === 0) {
      this.stateToContacts.delete(contact.state);
    }
  }

  listContacts(): void {
    this.contacts.forEach(contact => {
      console.log(contact.toString());
    });
  }

  addContact(contact: Contact): boolean {
    if (this.contacts.has(contact)) {
      return false;
    }
    this.contacts.add(contact);
    this.addToCityAndStateMaps(contact);
    return true;
  }

  editContact(
    firstName: string,
    lastName: string,
    updatedDetails: Partial<Contact>
  ): boolean {
    const contact = this.findContactByName(firstName, lastName);
    if (contact) {
      this.removeFromCityAndStateMaps(contact);
      Object.assign(contact, updatedDetails);
      this.addToCityAndStateMaps(contact);
      return true;
    }
    return false;
  }

  deleteContact(firstName: string, lastName: string): boolean {
    const contact = this.findContactByName(firstName, lastName);
    if (contact) {
      this.contacts.delete(contact);
      this.removeFromCityAndStateMaps(contact);
      return true;
    }
    return false;
  }

  getContacts(): Contact[] {
    return Array.from(this.contacts);
  }

  findContactByName(firstName: string, lastName: string): Contact | undefined {
    return Array.from(this.contacts).find(
      contact => contact.firstName === firstName && contact.lastName === lastName
    );
  }

  getContactsByCity(city: string): Contact[] {
    return Array.from(this.cityToContacts.get(city) || []);
  }

  getContactsByState(state: string): Contact[] {
    return Array.from(this.stateToContacts.get(state) || []);
  }

  getCountByCity(city: string): number {
    return this.cityToContacts.get(city)?.size || 0;
  }

  getCountByState(state: string): number {
    return this.stateToContacts.get(state)?.size || 0;
  }

  sortContactsByName(): Contact[] {
    return Array.from(this.contacts).sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  sortContactsByCity(): Contact[] {
    return Array.from(this.contacts).sort((a, b) => {
      return a.city.localeCompare(b.city);
    });
  }

  sortContactsByState(): Contact[] {
    return Array.from(this.contacts).sort((a, b) => {
      return a.state.localeCompare(b.state);
    });
  }

  sortContactsByZip(): Contact[] {
    return Array.from(this.contacts).sort((a, b) => {
      return a.zip.localeCompare(b.zip);
    });
  }


}
