import { Test, TestingModule } from '@nestjs/testing';
import { MozosController } from './mozos.controller';

describe('MozosController', () => {
  let controller: MozosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MozosController],
    }).compile();

    controller = module.get<MozosController>(MozosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
