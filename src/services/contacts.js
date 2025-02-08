import { SORT_ORDER } from "../constants/index.js";
import { ContactCollection } from "../models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";


export const createContact = async (payload,) => {
    const contact = await ContactCollection.create(payload);
    return contact;
};

export const deleteContact = async (contactID, userId) => {
    const contact = await ContactCollection.findOneAndDelete({
        _id: contactID,
        userId,
    });
    return contact;
};

export const updateContact = async (contactID, payload, userId, options = {}) => {
    const contact = await ContactCollection.findOneAndUpdate(
        { _id: contactID, userId },
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
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

    const contactsQuery = ContactCollection.find({ userId });

    if (filter.contactType) {
        contactsQuery.where('contactType').equals(filter.contactType);
    }

  const contctsCount = await ContactCollection.find({ userId })
    .merge(contactsQuery)
    .countDocuments({ userId });

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
