import { UPLOAD_DIR, TEMP_UPLOAD_DIR } from './constants/path.js';
import { initMongoDBConnection } from './db/initiMongoDbConnection.js';
import { startServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';

await createDirIfNotExists(TEMP_UPLOAD_DIR);
await createDirIfNotExists(UPLOAD_DIR);
await initMongoDBConnection();
startServer();
