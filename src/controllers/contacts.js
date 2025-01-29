import createHttpError from "http-errors";
import { ContactCollection } from "../models/contacts.js";
import { createContact, deleteContact, getAllContacts, updateContact } from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";

export const getContactsController = async (req, res, next) => {
    try {

        const { page, perPage } = parsePaginationParams(req.query);

        const { sortBy, sortOrder } = parseSortParams(req.query);

        const filter = parseFilterParams(req.query);

        const contacts = await getAllContacts({
            page,
            perPage,
            sortBy,
            sortOrder,
            filter,
        });

        res.json({
                status: 200,
                message: 'Successfully found all contacts!',
                data: contacts,
        });

    } catch (err) {
        next(err);
        }
};

export const getContactByIdController = async (req, res, next) => {
        const { contactID } = req.params;
        const contact = await ContactCollection.findById(contactID);

            if (!contact) {
                throw createHttpError(404, 'Student not found');
                }

            res.json({
                status: 200,
                message: `Successfully found contact with id ${contactID}!`,
                data: contact,
            });
};

export const createContactsController = async (req, res, next) => {
    try {
        const contact = await createContact(req.body);

        res.json({
            status: 201,
            message: 'Successfully created a contact!',
            data: contact,
        });
    } catch (err) {
        next(err);
    }
};

export const deleteContactController = async (req, res, next) => {

    const { contactID } = req.params;

    const contact = await deleteContact(contactID);

    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }
    res.status(204).send();
};

export const upsertContactsController = async (req, res, next) => {

        const { contactID } = req.params;

        const result = await updateContact(contactID, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data: result.contact,
  });
};

export const patchContactsController = async (req, res, next) => {

    const { contactID } = req.params;

    const result = await updateContact(contactID, req.body);

    if (!result) {
        next(createHttpError(404, 'Contact not found'));
    }
    res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};
