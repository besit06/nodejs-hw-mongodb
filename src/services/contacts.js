import { SORT_ORDER } from "../constants/index.js";
import { ContactCollection } from "../models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";


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

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactCollection.find();
  const contctsCount = await ContactCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contctsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};
