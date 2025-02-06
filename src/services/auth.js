import createHttpError from "http-errors";
import { UserCollection } from "../models/users.js";
import bcrypt from 'bcrypt';
import { SessionCollection } from "../models/sessions.js";
import { FIFTEEN_MINUTES, ONE_DAY } from "../constants/index.js";
import { randomBytes } from 'crypto';



export const registerUser = async ({email, password, name}) => {
    let user = await UserCollection.findOne({ email });

    if (user) {
        throw createHttpError(409, 'Email in use');
    }

    const hashedPassword = await bcrypt.hash(password, 15);

    user = await UserCollection.create({ email, password: hashedPassword, name });

    return user;
};



export const loginUser = async ({ email, password }) => {
    const user = await UserCollection.findOne({ email });

    if (!user) {
        throw createHttpError(404, 'User not found');
    }
    const isEqual = await bcrypt.compare(password, user.password);

  if (!isEqual) {
    throw new createHttpError(401, 'Login or password is incorrect!');
  }

  await SessionCollection.deleteOne({ userId: user._id });

   const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};



export const logoutUser = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};



const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};



export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  await SessionCollection.deleteOne({ _id: sessionId, refreshToken });

  return await SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};


