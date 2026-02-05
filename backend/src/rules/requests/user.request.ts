import { JwtPayload } from 'jsonwebtoken';
import z from 'zod/v3';
import { RoleType, TokenType } from '~/constants/enums';
import { loginSchema, setPasswordSchema } from '../auth/auth.schema';

export type LoginRequestBody = z.infer<typeof loginSchema>['body'];

export type UpdatePasswordRequestBody = z.infer<typeof setPasswordSchema>['body'];
export interface TokenPayload extends JwtPayload {
  userId: string;
  type: TokenType;
  role: RoleType;
  exp: number;
  iat: number;
}
