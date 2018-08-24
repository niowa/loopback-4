import {repository} from '@loopback/repository';
import {
  post,
  get,
  requestBody,
  HttpErrors
} from '@loopback/rest';
import {Token, User} from '../constants/interfaces';
import {UsersRepository} from '../repositories';
import { v4 as uuid } from 'uuid';
import * as CryptService from '../services/crypt';
import * as TokenService from '../services/token';
import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {inject} from '@loopback/context';

interface PasswordData {
  password: string;
  key: string;
}

export class ProfileController {
  constructor(
    @repository(UsersRepository)
    public usersRepository : UsersRepository,
  ) {}

  @post('/profile')
  async create(@requestBody() obj: User)
    : Promise<Token> {
    const user = await this.usersRepository.findOne({ where: { email: obj.email } });
    if (user) {
      throw new HttpErrors.BadRequest('User exists');
    }

    const passwordData = await CryptService.hashPassword(obj.password);
    const newUser = {
      id: uuid(),
      email: obj.email,
      password: passwordData.password,
      key: passwordData.key,
    };

    await this.usersRepository.create(newUser);

    const token = await TokenService.getJWToken(newUser.id);
    return { token };
  }

  @authenticate('JwtStrategy')
  @get('/profile')
  async find(@inject(AuthenticationBindings.CURRENT_USER) user: User | undefined,): Promise<User> {
    if (!user) {
      throw new HttpErrors.Unauthorized('Unauthorized');
    }
    const formattedUser: User = {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
    };

    return formattedUser;
  }
}
