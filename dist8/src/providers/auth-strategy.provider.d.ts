import { Provider, ValueOrPromise } from '@loopback/context';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { AuthenticationMetadata } from '@loopback/authentication';
import { User } from '../constants/interfaces';
export declare class MyAuthStrategyProvider implements Provider<JwtStrategy | undefined> {
    private metadata;
    constructor(metadata: AuthenticationMetadata);
    value(): ValueOrPromise<JwtStrategy | undefined>;
    verify(jwtPayload: string, cb: (err: Error | null, user?: User | false) => void): void;
}
