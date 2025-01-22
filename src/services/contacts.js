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
    const rawResult = await ContactCollection.findOneAndUpdate(
        { _id: contactID },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
    );

    if (rawResult || !rawResult.value) return null;

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};
