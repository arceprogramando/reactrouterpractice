import { getContacts } from "../contact";
import { ContactType } from "./contact";

interface LoaderData {
    contact: ContactType; // Ajusta esto según la estructura de tu tipo ContactType
  }

  export async function loader({ params }) {
    const contact = await getContacts(params.contactId);
    return { contact };
  }