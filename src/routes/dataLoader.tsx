import { getContacts } from '../contact'


export async function loader() {
  const contacts = await getContacts("");
  return { contacts };
}