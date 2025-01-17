import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import { getEnvVar } from './utils/getEnvVar.js';
import { ContactCollection } from './models/contacts.js';

dotenv.config();

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.get('/contacts', async (req, res) => {
        try {
            const contacts = await ContactCollection.find();
            res.status(200).json({
                status: 200,
                message: 'Successfully found all contacts!',
                data: contacts,
            });
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: 'Failed to fetch contacts',
                error: err.message,
            });
        }
    });

     app.get('/contacts/:contactID', async (req, res) => {
        const { contactID } = req.params;
        try {
            const contact = await ContactCollection.findById(contactID);
            if (!contact) {
                return res.status(404).json({
                    message: 'Contact not found',
                });
            }
            res.status(200).json({
                status: 200,
                message: `Successfully found contact with id ${contactID}!`,
                data: contact,
            });
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: 'Failed to fetch contact',
                error: err.message,
            });
        }
    });

    app.use('*', (req, res, next) => {
        res.status(404).json({
            message: 'Not found',
        });
    });

    app.use((err, req, res, next) => {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message,
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
};
