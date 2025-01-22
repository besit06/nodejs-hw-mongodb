import { Router } from "express";
import { getContactByIdController, getContactscontroller } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.get('/contacts', ctrlWrapper(getContactscontroller));
router.get('/contacts/:contactID', ctrlWrapper(getContactByIdController));


export default router;
