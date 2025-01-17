import { setupServer } from './server.js';
import { initMongoDBCon } from './db/initMongoConnection.js';

setupServer();
await initMongoDBCon();
