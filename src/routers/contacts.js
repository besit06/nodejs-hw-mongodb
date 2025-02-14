import { Router } from "express";
import { createContactsController, deleteContactController, getContactByIdController, getContactsController, patchContactsController, upsertContactsController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.use('/:contactID', isValidId('contactID'));

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactID', ctrlWrapper(getContactByIdController));
router.post('/', upload.single('photo'), validateBody(createContactSchema),ctrlWrapper(createContactsController));
router.delete('/:contactID', ctrlWrapper(deleteContactController));
router.put('/:contactID', upload.single('photo'), validateBody(createContactSchema),ctrlWrapper(upsertContactsController));
router.patch('/:contactID', upload.single('photo'), validateBody(updateContactSchema), ctrlWrapper(patchContactsController));



export default router;

