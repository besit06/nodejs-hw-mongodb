import { ContactCollection } from "../models/contacts.js";


export const createContact = async (payload) => {
    const contact = await ContactCollection.create(payload);
    return contact;
};
