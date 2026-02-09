import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;

  const mockUser: User = {
    id: 1,
    username: 'johndoe',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    isActive: true,
    mealRecords: [],
  };

  const mockUsersService = {
    findByUsername: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user without password when credentials are valid', async () => {
      mockUsersService.findByUsername.mockResolvedValue(mockUser);

      const result = await service.validateUser('johndoe', 'password123');

      expect(usersService.findByUsername).toHaveBeenCalledWith('johndoe');
      expect(result).toEqual({
        id: 1,
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
        mealRecords: [],
      });
      // Ensure password is excluded
      expect(result).not.toHaveProperty('password');
    });

    it('should return null when user is not found', async () => {
      mockUsersService.findByUsername.mockResolvedValue(null);

      const result = await service.validateUser('nonexistent', 'password123');

      expect(result).toBeNull();
    });

    it('should return null when password is incorrect', async () => {
      mockUsersService.findByUsername.mockResolvedValue(mockUser);

      const result = await service.validateUser('johndoe', 'wrongpassword');

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return an access token', () => {
      const user = {
        id: 1,
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
        mealRecords: [],
      };

      mockJwtService.sign.mockReturnValue('signed-jwt-token');

      const result = service.login(user);

      expect(jwtService.sign).toHaveBeenCalledWith({
        username: 'johndoe',
        sub: 1,
      });
      expect(result).toEqual({ access_token: 'signed-jwt-token' });
    });
  });
});
