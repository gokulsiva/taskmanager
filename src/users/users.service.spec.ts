import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRepositoryFake } from './user.repository.fake';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let userService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: UserRepositoryFake,
        }
      ]
    }).compile();

    userService = userModule.get(UsersService);
    userRepository = userModule.get(getRepositoryToken(User));
  });

  it('UserService should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('UserRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  it('User should be created', async () => {
    
    const email = 'u1@test.com';
    const password = 'password';
    const user: User = {
      uid: 1,
      email,
      password,
      tasks: []
    };

    const userRepositorySaveSpy = jest
      .spyOn(userRepository, 'save')
      .mockResolvedValue(user);
    
    const saveResult = await userService.create({
      email,
      password
    });

    expect(userRepositorySaveSpy).toHaveBeenCalledTimes(1);
    expect(userRepositorySaveSpy).toBeCalledWith({
      email,
      password,
      tasks: []
    });
    expect(saveResult).toStrictEqual(user);
  });

  it('User should be deleted', async () => {
    const userRepositoryDeleteSpy = jest
      .spyOn(userRepository, 'delete');

      await userService.delete(1);

      expect(userRepositoryDeleteSpy).toBeCalledWith({uid: 1});
      expect(userRepositoryDeleteSpy).toBeCalledTimes(1);
  });

  it('User should be finded by uid', async () => {
    const user: User = {
      uid: 1,
      email: 'u1@test.com',
      password: 'password',
      tasks: []
    }
    const userRepositoryFindOneSpy = jest
      .spyOn(userRepository, 'findOne')
      .mockResolvedValue(user);
    
    const foUser = await userService.getUser(1);

    expect(userRepositoryFindOneSpy).toBeCalledWith({uid: 1});
    expect(userRepositoryFindOneSpy).toHaveBeenCalledTimes(1);
    expect(foUser).toStrictEqual(user);

  });

});
