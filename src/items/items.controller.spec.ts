import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

describe('ItemsController', () => {
  let controller: ItemsController;
  const mockItemsService = {
    //this will give the fake  implementation of create method
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    update: jest.fn((id, dto) => {
      return {
        id,
        ...dto,
      };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [ItemsService],
    })
      .overrideProvider(ItemsService)
      .useValue(mockItemsService)
      .compile();
    controller = module.get<ItemsController>(ItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    const dto = { name: 'Test', description: 'Test description', qty: 10 };
    expect(
      controller.create({
        name: dto.name,
        description: dto.description,
        qty: dto.qty,
      }),
    ).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      description: expect.any(String),
      qty: expect.any(Number),
    });
    expect(mockItemsService.create).toHaveBeenCalledWith({
      name: 'Test',
      description: 'Test description',
      qty: 10,
    });
  });

  it('should update a user', () => {
    const dto = { name: 'Test', description: 'Test description', qty: 10 };
    expect(controller.update('1', dto)).toEqual({
      id: '1',
      ...dto,
    });
  });
});
