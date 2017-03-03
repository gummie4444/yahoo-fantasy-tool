import { DB_TYPES } from './dbTypes';

export const HOST = process.env.HOSTNAME || 'localhost';
export const PORT = process.env.PORT || '3000';
export const ENV = process.env.NODE_ENV || 'development';

export const DB_TYPE = process.env.DB_TYPE || DB_TYPES.MONGO;

export const USE_MULTER = process.env.USE_MULTER || false;
export const USE_AWS_S3 = process.env.USE_AWS_S3 || false;

export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID || null;

