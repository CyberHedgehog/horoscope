import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { rootMongooseTestModule, closeInMongodConnection } from '../test-utils/MongooseTestModule';
import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
