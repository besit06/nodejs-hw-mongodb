import createHttpError from "http-errors";
import { ContactCollection } from "../models/contacts.js";
import { createContact } from "../services/contacts.js";


export const getContactscontroller = async (req, res, next) => {
    try {
        const contacts = await ContactCollection.find();

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

