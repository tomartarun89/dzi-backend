import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService, User } from '../users';
import { JwtService } from '@nestjs/jwt';

class UsersServiceMock {
  async findOneByEmail(username: string) {
    //TODO: Find a better way to mock sequelize models
    let payload;
    if (username == 'John') {
      payload = {
        password: 'doe',
        id: 'John',
        email: 'johndoe@gmail.com',
      };
    }
    return payload;
  }
}
class JwtServiceMock {
  comparePassword(oldPassword, newPassword) {
    return oldPassword == newPassword;
  }
}

describe('AuthService', () => {
  let authService: AuthService;
  const UserServiceMockProvider = [
    {
      provide: UsersService,
      useClass: UsersServiceMock,
    },
    { provide: JwtService, useClass: JwtServiceMock },
  ];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, ...UserServiceMockProvider],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser Function', () => {
    it('should exist.', () => {
      expect(authService.validateUser).toBeDefined();
    });
    test('Invalid user is null.', async () => {
      const payload = await authService.validateUser('username', 'password');
      expect(payload).toBeNull();
    });
  });
});
