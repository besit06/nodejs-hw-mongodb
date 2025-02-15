import multer from 'multer';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

console.log('Checking if TEMP_UPLOAD_DIR exists:', TEMP_UPLOAD_DIR);

fs.access(TEMP_UPLOAD_DIR).catch(async (err) => {
  console.error('TEMP_UPLOAD_DIR does not exist, creating...', err);
  await fs.mkdir(TEMP_UPLOAD_DIR, { recursive: true });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(`Saving file to: ${TEMP_UPLOAD_DIR}`);
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    console.log(`Generated filename: ${uniqueSuffix}_${file.originalname}`);
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

export const upload = multer({ storage });
