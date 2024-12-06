// src/types.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // O define el tipo exacto de tu usuario (por ejemplo, `UserEntity`)
    }
  }
}
