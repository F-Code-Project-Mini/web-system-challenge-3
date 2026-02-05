import { RoleType } from './constants/enums';
import { TokenPayload } from './rules/requests/User.requests';

declare module 'express' {
  interface Request {
    userId?: string;
    role?: RoleType;
    roles?: RoleType[];
    tokenPayload?: TokenPayload;
    candidateId?: string;
  }
}
