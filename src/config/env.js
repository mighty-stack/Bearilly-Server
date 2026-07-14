import dotenv from 'dotenv';

dotenv.config();
 
const env = () => ({
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,

  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: process.env.PORT || 5002,

  JWT_SECRET: process.env.JWT_SECRET,

  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,

  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",

  OPENAI_API_KEY: process.env.OPENAI_API_KEY,

  REDIS_URL: process.env.REDIS_URL,

  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,

  PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
  PAYSTACK_PUBLIC_KEY: process.env.PAYSTACK_PUBLIC_KEY,
  PAYSTACK_BASE_URL: process.env.PAYSTACK_BASE_URL || 'https://api.paystack.co',

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
});


export default env;  