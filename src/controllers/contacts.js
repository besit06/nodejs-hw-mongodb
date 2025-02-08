import createHttpError from "http-errors";
import { createContact, deleteContact, getAllContacts, updateContact } from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import { ContactCollection } from "../models/contacts.js";


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
            userId: req.user._id,
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
    try {
        const { contactID } = req.params;
        const userId = req.user._id;


        const contact = await ContactCollection.findOne({ _id: contactID, userId });

        if (!contact) {
            throw createHttpError(404, 'Contact not found');
        }

        res.json({
            status: 200,
            message: `Successfully found contact with id ${contactID}!`,
            data: contact,
        });
    } catch (err) {
        next(err);
    }
};


export const createContactsController = async (req, res, next) => {
    try {
        const contactData = { ...req.body, userId: req.user._id };
        const contact = await createContact(contactData);

        res.status(201).json({
            status: 201,
            message: 'Successfully created a contact!',
            data: contact,
        });
    } catch (err) {
        next(err);
    }
};


export const deleteContactController = async (req, res, next) => {
    try {
        const { contactID } = req.params;
        const userId = req.user._id;

        const contact = await deleteContact(contactID, userId);

        if (!contact) {
            throw createHttpError(404, 'Contact not found');
        }

        res.status(204).send();
    } catch (err) {
        next(err);
    }
};


export const upsertContactsController = async (req, res, next) => {
    try {
        const { contactID } = req.params;
        const userId = req.user._id;

        const result = await updateContact(contactID, req.body, userId, { upsert: true });

        if (!result) {
            throw createHttpError(404, 'Contact not found');
        }

        const status = result.isNew ? 201 : 200;

        res.status(status).json({
            status,
            message: `Successfully upserted a contact!`,
            data: result.contact,
        });
    } catch (err) {
        next(err);
    }
};


export const patchContactsController = async (req, res, next) => {
    try {
        const { contactID } = req.params;
        const userId = req.user._id;

        const result = await updateContact(contactID, req.body, userId);

        if (!result) {
            throw createHttpError(404, 'Contact not found');
        }

        res.json({
            status: 200,
            message: `Successfully patched a contact!`,
            data: result.contact,
        });
    } catch (err) {
        next(err);
    }
};
