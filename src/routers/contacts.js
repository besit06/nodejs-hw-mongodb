import { Router } from "express";
import { createContactsController, deleteContactController, getContactByIdController, getContactscontroller, patchContactsController, upsertContactsController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.get('/', ctrlWrapper(getContactscontroller));
router.get('/:contactID', ctrlWrapper(getContactByIdController));
router.post('/', ctrlWrapper(createContactsController));
router.delete('/:contactID', ctrlWrapper(deleteContactController));
router.put('/:contactID', ctrlWrapper(upsertContactsController));
router.patch('/:contactID', ctrlWrapper(patchContactsController));

export default router;

