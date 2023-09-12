/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserAccountController } from './user-account.controller';

describe('UserController', () => {
  let controller: UserAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAccountController],
    }).compile();

    controller = module.get<UserAccountController>(UserAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
