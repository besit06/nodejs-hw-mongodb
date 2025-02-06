import { registerUserSchema } from "../validation/auth.js";
import { registerUserController } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { Router } from 'express';


const router = Router();


router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));



export default router;
