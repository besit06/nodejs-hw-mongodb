import createHttpError from "http-errors";
import { ContactCollection } from "../models/contacts.js";


export const getContactscontroller = async (req, res, next) => {
    try {
        const contacts = await ContactCollection();

        res.status(200).json({
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
        const contact = await ContactCollection(contactID);

            if (!contact) {
                throw createHttpError(404, 'Student not found');
                }

            res.status(200).json({
                status: 200,
                message: `Successfully found contact with id ${contactID}!`,
                data: contact,
            });
        };

