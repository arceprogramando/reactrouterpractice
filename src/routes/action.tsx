import { createContact } from "../contact";

export async function action() {
  const contact = await createContact();
  return { contact };
}