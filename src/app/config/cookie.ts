import { envVariable } from '.';
import { CookieOptions } from 'express';

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: envVariable.NODE_ENV==="production", // 🔒 only true in production
  sameSite:envVariable.NODE_ENV==="production" ? "none" : "lax",
  path: '/',
};
