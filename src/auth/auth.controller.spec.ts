import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import type { RequestWithUser } from './model';
import { User } from 'src/users/entities/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;
  let usersService: jest.Mocked<UsersService>;

  const mockUser: Omit<User, 'password'> = {
    id: 1,
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    isActive: true,
    mealRecords: [],
  };

  const mockAuthService = {
    login: jest.fn(),
    validateUser: jest.fn(),
  };

  const mockUsersService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
    usersService = module.get(UsersService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return access token from authService.login', () => {
      const req = { user: mockUser } as RequestWithUser;
      const loginResult = { access_token: 'jwt-token' };

      mockAuthService.login.mockReturnValue(loginResult);

      const result = controller.login(req);

      expect(authService.login).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(loginResult);
    });
  });

  describe('getProfile', () => {
    it('should return user profile from usersService.findOne', async () => {
      const fullUser: User = {
        ...mockUser,
        password: 'password123',
      };
      const req = { user: mockUser } as RequestWithUser;

      mockUsersService.findOne.mockResolvedValue(fullUser);

      const result = await controller.getProfile(req);

      expect(usersService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(fullUser);
    });
  });
});
