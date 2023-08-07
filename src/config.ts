import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export enum EEnv {
  PRODUCTION = 'prod',
  DEVELOPMENT = 'dev',
}

export interface IEnvConfig {
  PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_NAME: string;
  SECRET_WORD: string;
  EXPIRATION_TIME_ACCESS_TOKEN: string;
  EXPIRATION_TIME_REFRESH_TOKEN: string;
  FRONTEND_URL: string;
  SENDGRID_API_KEY: string;
  RABBIT_MQ_URI: string;
}

export const joiSchemaEnv = Joi.object<IEnvConfig>({
  PORT: Joi.number().min(3000).max(5000).required(),
  DB_HOST: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  SECRET_WORD: Joi.string().required(),
  EXPIRATION_TIME_ACCESS_TOKEN: Joi.string().required(),
  EXPIRATION_TIME_REFRESH_TOKEN: Joi.string().required(),
  FRONTEND_URL: Joi.string().required(),
  SENDGRID_API_KEY: Joi.string().required(),
  RABBIT_MQ_URI: Joi.string().uri().required(),
});

export const config = registerAs('config', () => {
  return {
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    PORT: parseInt(process.env.PORT),
    SECRET_WORD: process.env.SECRET_WORD,
    EXPIRATION_TIME_ACCESS_TOKEN: process.env.EXPIRATION_TIME_ACCESS_TOKEN,
    EXPIRATION_TIME_REFRESH_TOKEN: process.env.EXPIRATION_TIME_REFRESH_TOKEN,
    FRONTEND_URL: process.env.FRONTEND_URL,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    RABBIT_MQ_URI: process.env.RABBIT_MQ_URI,
  };
});
