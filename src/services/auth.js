import createHttpError from "http-errors";
import { UserCollection } from "../models/users.js";
import bcrypt from 'bcrypt';


export const registerUser = async ({email, password, name}) => {
    let user = await UserCollection.findOne({ email });

    if (user) {
        throw createHttpError(409, 'Email in use');
    }

    const hashedPassword = await bcrypt.hash(password, 15);

    user = await UserCollection.create({ email, password: hashedPassword, name });

    return user;
};
