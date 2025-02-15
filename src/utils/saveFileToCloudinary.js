import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';

import { getEnvVar } from './getEnvVar.js';
import { CLOUDINARY } from '../constants/index.js';


console.log('CLOUDINARY_CLOUD_NAME:', getEnvVar(CLOUDINARY.CLOUD_NAME));
console.log('CLOUDINARY_API_KEY:', getEnvVar(CLOUDINARY.API_KEY));
console.log('CLOUDINARY_API_SECRET:', getEnvVar(CLOUDINARY.API_SECRET));

cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),
  api_key: getEnvVar(CLOUDINARY.API_KEY),
  api_secret: getEnvVar(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
