import {Provider, inject, ValueOrPromise} from '@loopback/context';
import {Strategy as JwtStrategy} from 'passport-jwt';
import {
  AuthenticationBindings,
  AuthenticationMetadata,
} from '@loopback/authentication';
import {ExtractJwt} from 'passport-jwt';
import {User} from '../constants/interfaces';

const opts = {
  jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
  secretOrKey: 'f4vb8fJu9hE9XfX6szY5awQU',
};

export class MyAuthStrategyProvider implements Provider<JwtStrategy | undefined> {
  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
  ) {}

  value(): ValueOrPromise<JwtStrategy | undefined> {
    // The function was not decorated, so we shouldn't attempt authentication
    if (!this.metadata) {
      return undefined;
    }

    const name = this.metadata.strategy;
    if (name === 'JwtStrategy') {
      return new JwtStrategy(opts, this.verify);
    } else {
      return Promise.reject(`The strategy ${name} is not available.`);
    }
  }

  verify(
    jwtPayload: string,
    cb: (err: Error | null, user?: User | false) => void,
  ) {
    const user: User = {
      id: "test",
      name: "test",
      email: "val",
    };
    cb(null, user);
    // find user by name & password
    // call cb(null, false) when user not found
    // call cb(null, user) when user is authenticated
  }
}
