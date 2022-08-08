import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let service: ItemsService;
  const mockItemsModel = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((user) =>
        Promise.resolve({ id: Date.now(), ...user }),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getModelToken('Item'),
          useValue: mockItemsModel,
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a new user record and return that', async () => {
    const dto = { name: 'Test', description: 'Test description', qty: 10 };
    expect(
      await service.create({
        name: dto.name,
        description: dto.description,
        qty: dto.qty,
      }),
    ).not.toEqual(null);
  });
});
