import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import { ContactType } from './routes/contact';

interface FakeCache {
  [key: string]: boolean;
}

export async function getContacts(query: string): Promise<ContactType[]> {
  await fakeNetwork(`getContacts:${query}`);
  let contacts: ContactType[] = (await localforage.getItem("contacts")) || [];

  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }

  return contacts.sort(sortBy("last", "createdAt"));
}

let fakeCache: FakeCache = {};

async function fakeNetwork(key: string): Promise<void> {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}

export async function createContact(): Promise<ContactType> {
  await fakeNetwork("createContact");
  const id = Math.random().toString(36).substring(2, 9);
  const contact: ContactType = { id, createdAt: new Date() };
  const contacts = await getContacts("");
  contacts.unshift(contact);
  await set("contacts", contacts);
  return contact;
}


async function set(key: string, contacts: ContactType[]): Promise<void> {
  await localforage.setItem(key, contacts);
}




// export async function createContact() {
//   await fakeNetwork();
//   let id = Math.random().toString(36).substring(2, 9);
//   let contact = { id, createdAt: Date.now() };
//   let contacts = await getContacts();
//   contacts.unshift(contact);
//   await set(contacts);
//   return contact;
// }

// export async function getContact(id) {
//   await fakeNetwork(`contact:${id}`);
//   let contacts = await localforage.getItem("contacts");
//   let contact = contacts.find(contact => contact.id === id);
//   return contact ?? null;
// }

// export async function updateContact(id, updates) {
//   await fakeNetwork();
//   let contacts = await localforage.getItem("contacts");
//   let contact = contacts.find(contact => contact.id === id);
//   if (!contact) throw new Error("No contact found for", id);
//   Object.assign(contact, updates);
//   await set(contacts);
//   return contact;
// }

// export async function deleteContact(id) {
//   let contacts = await localforage.getItem("contacts");
//   let index = contacts.findIndex(contact => contact.id === id);
//   if (index > -1) {
//     contacts.splice(index, 1);
//     await set(contacts);
//     return true;
//   }
//   return false;
// }

