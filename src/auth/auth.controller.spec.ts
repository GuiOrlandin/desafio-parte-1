import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/user.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const mockJwtService = {
      sign: jest.fn().mockReturnValue('mocked_token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        { provide: JwtService, useValue: mockJwtService },
        {
          provide: 'UserSchemaModel',
          useValue: {},
        },
        {
          provide: 'ProductSchemaModel',
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('authenticate', () => {
    it('should return a JWT token upon successful authentication', async () => {
      const mockToken = 'mocked_token';
      jest
        .spyOn(authService, 'signIn')
        .mockResolvedValue({ access_token: mockToken });

      const user = {
        email: 'username',
        password: 'password',
      };

      const result = await controller.signIn(user);

      expect(authService.signIn).toHaveBeenCalledWith(
        user.email,
        user.password,
      );

      expect(result).toEqual({ access_token: mockToken });
    });
  });
});
