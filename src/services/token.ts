import * as jwt from 'jsonwebtoken';

const JWTSecret = 'f4vb8fJu9hE9XfX6szY5awQU';
const expirationPeriod = '15d';

export function getJWToken(id: string, expiration = expirationPeriod): string {
  return jwt.sign({ id }, JWTSecret, { expiresIn: expiration });
}
