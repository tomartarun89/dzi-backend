import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

jest.mock('./auth.service.ts');

describe('Auth Controller', () => {
  let authController: AuthController;
  let authService: AuthService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();
    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('Login Function', () => {
    it('should be defined.', () => {
      expect(authController.login).toBeDefined();
    });
    it('should return a jwt for valid user.', async () => {
      const payload = {
        username: 'tomartarun.official89@gmail.com',
        password: 'password',
      };
      const expectedResult = {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvbWFydGFydW4ub2ZmaWNpYWw4OUBnbWFpbC5jb20iLCJpYXQiOjE1OTcxMTc5MzAsImV4cCI6MTU5NzEyMTUzMH0.-JIVdQ0tJlK4VbAnf_OAMcq2zjGv3qQKeoj7Ar0icCs',
      };
      jest.spyOn(authService, 'login').mockResolvedValue(expectedResult);
      expect(await authController.login(payload)).toBe(expectedResult);
    });

    it('should return undefined for invalud user.', async () => {
      const expectedResult = undefined;
      const mockPayload = {};
      jest.spyOn(authService, 'login').mockResolvedValue(expectedResult);
      expect.assertions(1);
      const result = await authController.login(mockPayload);
      expect(result).toBe(expectedResult);
    });
  });
});
