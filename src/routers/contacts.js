import { Router } from "express";
import { createContactsController, getContactByIdController, getContactscontroller } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.get('/', ctrlWrapper(getContactscontroller));
router.get('/:contactID', ctrlWrapper(getContactByIdController));
router.post('/', ctrlWrapper(createContactsController));

router.post('/test', (req, res) => {
    res.status(200).json({
        message: 'POST test route works!',
        body: req.body,
    });
});


export default router;
