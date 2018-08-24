import {Provider, inject, ValueOrPromise} from '@loopback/context';
import {Strategy as JwtStrategy} from 'passport-jwt';
import {
  AuthenticationBindings,
  AuthenticationMetadata,
} from '@loopback/authentication';
import {ExtractJwt} from 'passport-jwt';
import {User} from '../constants/interfaces';
import {UsersRepository} from '../repositories';
import {repository} from '@loopback/repository';
import {GeneratedToken} from '../constants/interfaces';

const opts = {
  jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
  secretOrKey: 'f4vb8fJu9hE9XfX6szY5awQU',
};

export class MyAuthStrategyProvider implements Provider<JwtStrategy | undefined> {
  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
    @repository(UsersRepository)
    private usersRepository : UsersRepository,
  ) {}

  value(): ValueOrPromise<JwtStrategy | undefined> {
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

  verify = (
    jwtPayload: GeneratedToken,
    cb: (err: Error | null, user?: User | false) => void,
  ) => {
    this.usersRepository.findById(jwtPayload.id)
      .then(user => {
        cb(null, user);
      })
      .catch(error => {
        cb(null, false);
      });
  }
}
