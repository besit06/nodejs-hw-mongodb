import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
import { getEnvVar } from './getEnvVar.js';

export const saveFileToUploadDir = async (file) => {
  const tempFilePath = path.join(TEMP_UPLOAD_DIR, file.filename);
  const uploadFilePath = path.join(UPLOAD_DIR, file.filename);

  try {
    console.log(`📂 Checking if temp file exists: ${tempFilePath}`);
    await fs.access(tempFilePath);
    console.log(`✅ Temp file found!`);

    console.log(`📂 Checking if UPLOAD_DIR exists: ${UPLOAD_DIR}`);
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    console.log(`📦 Copying file from ${tempFilePath} to ${uploadFilePath}`);
    await fs.copyFile(tempFilePath, uploadFilePath);

    console.log(`🗑 Deleting original file: ${tempFilePath}`);
    await fs.unlink(tempFilePath);

    return `${getEnvVar('APP_DOMAIN')}/uploads/${file.filename}`;
  } catch (err) {
    console.error(`🚨 Error:`, err);
    throw err;
  }
};

