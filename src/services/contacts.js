import { ContactCollection } from "../models/contacts.js";


export const createContact = async (payload) => {
    const contact = await ContactCollection.create(payload);
    return contact;
};

export const deleteContact = async (contactID) => {
    const contact = await ContactCollection.findOneAndDelete({
        _id: contactID,
    });
    return contact;
};

export const updateContact = async (contactID, payload, options = {}) => {
    const contact = await ContactCollection.findOneAndUpdate(
        { _id: contactID },
        payload,
        {
            new: true,
            ...options,
        },
    );

    if (!contact) return null;

    return {
        contact,
        isNew: Boolean(options?.upsert),
    };
};
