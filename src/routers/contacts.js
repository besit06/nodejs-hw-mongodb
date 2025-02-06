import { Router } from "express";
import { createContactsController, deleteContactController, getContactByIdController, getContactsController, patchContactsController, upsertContactsController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { registerUserSchema } from "../validation/auth.js";
import { registerUserController } from "../controllers/auth.js";

const router = Router();

router.use('/:contactID', isValidId('contactID'));

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactID', ctrlWrapper(getContactByIdController));
router.post('/', validateBody(createContactSchema),ctrlWrapper(createContactsController));
router.delete('/:contactID', ctrlWrapper(deleteContactController));
router.put('/:contactID', validateBody(createContactSchema),ctrlWrapper(upsertContactsController));
router.patch('/:contactID', validateBody(updateContactSchema), ctrlWrapper(patchContactsController));


router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));


export default router;

