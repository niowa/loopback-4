import {
  post,
  requestBody,
  HttpErrors
} from '@loopback/rest';
import {repository} from '@loopback/repository';
import {UsersRepository} from '../repositories';
import {Token, User} from '../constants/interfaces';

import * as CryptService from '../services/crypt';
import * as TokenService from '../services/token';

export class SessionController {
  constructor(
    @repository(UsersRepository)
    public usersRepository : UsersRepository,
  ) {}

  @post('/session')
  async create(@requestBody() obj: User)
    : Promise<Token> {
    const user = await this.usersRepository.findOne({ where: { email: obj.email } });

    if (!user) {
      throw new HttpErrors.Unauthorized('Wrong email or password');
    }

    const passwordData = await CryptService.hashPassword(obj.password, user.key);

    if (passwordData.password === user.password) {
      const token = await TokenService.getJWToken(user.id || '');
      return { token };
    } else {
      throw new HttpErrors.Unauthorized('Wrong email or password');
    }
  }
}
