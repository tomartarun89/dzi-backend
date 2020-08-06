import { Test, TestingModule } from '@nestjs/testing';
import { Groups } from './groups';

describe('Groups', () => {
  let provider: Groups;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Groups],
    }).compile();

    provider = module.get<Groups>(Groups);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
