import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { rootMongooseTestModule, closeInMongodConnection } from '../test-utils/MongooseTestModule';
import * as faker from 'faker';

describe('UserController', () => {
  let controller: UserController;
  let fakeUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    fakeUser = {
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(),
    };
  });

  afterEach(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create user', async () => {
    const response = await controller.create(fakeUser);
    expect(response.email).toBe(fakeUser.email);
  });

  it('find user', async () => {
    const createdUser = await controller.create(fakeUser);
    const user = await controller.findOne(createdUser._id);
    expect(user.email).toBe(createdUser.email);
  })

  it('update user', async () => {
    const createdUser = await controller.create(fakeUser);
    const newFirstName: string = faker.name.firstName();
    const updateResult = await controller.update(createdUser._id, { firstName: newFirstName });
    const updatedUser = await controller.findOne(createdUser._id);
    expect(updateResult.ok).toBe(1);
    expect(updatedUser.firstName).toBe(newFirstName);
  });

  it('delete user', async () => {
    const createdUser = await controller.create(fakeUser);
    await controller.remove(createdUser._id);
    const deletedUser = await controller.findOne(createdUser._id);
    expect(deletedUser).toBeNull();
  })
});
