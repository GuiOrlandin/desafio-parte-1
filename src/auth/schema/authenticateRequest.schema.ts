import { Request } from 'express';

export class AuthenticatedRequestSchema extends Request {
  user: {
    id: string;
    email: string;
    name: string;
    created_at: string;
  };
}
