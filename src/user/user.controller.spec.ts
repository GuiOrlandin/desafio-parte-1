import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { UserDto } from './dto/userDto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
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

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should create a user', async () => {
      const userDto: UserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '123456',
      };
      const createdUser = { id: 1, ...userDto };

      const created = jest
        .spyOn(service, 'create')
        .mockResolvedValue(createdUser);

      const result = await controller.create(userDto);

      expect(service.create).toHaveBeenCalledWith(userDto);
      expect(result).toEqual(createdUser);
    });
  });

  describe('findOne', () => {
    it('should return a user by email', async () => {
      const email = 'john.doe@example.com';
      const user = { id: 1, name: 'John Doe', email };
      jest.spyOn(service, 'findOneByEmail').mockResolvedValue(user);

      const result = await controller.findOneByEmail(email);

      expect(service.findOneByEmail).toHaveBeenCalledWith(email);
      expect(result).toEqual(user);
    });
  });

    describe('remove', () => {
      it('should remove a user by email', async () => {
        const email = 'john.doe@example.com';
        jest.spyOn(service, 'remove').mockResolvedValue(undefined);

        const result = await controller.remove(email);

        expect(service.remove).toHaveBeenCalledWith(email);
        expect(result).toBeUndefined();
      });
    });
});
