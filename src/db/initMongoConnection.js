import mongoose from 'mongoose';
import { ENV_VARS } from '../constants/env.js';
import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoDBCon = async () => {
    try {

        const user = getEnvVar(ENV_VARS.MONGODB_USER);
        const password = getEnvVar(ENV_VARS.MONGODB_PASSWORD);
        const url = getEnvVar(ENV_VARS.MONGODB_URL);
        const db = getEnvVar(ENV_VARS.MONGODB_DB);

        const conURI = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`;

        await mongoose.connect(conURI);

        console.log('Mongo connection successfully established!');

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
