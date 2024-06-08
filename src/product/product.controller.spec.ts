import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './product.controller';
import { ProductService } from './product.service';
import { ProductDto } from './dto/productDto';
import { JwtModule, JwtService } from '@nestjs/jwt';

describe('Product Controller', () => {
  let controller: ProductsController;
  let service: ProductService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({})],
      controllers: [ProductsController],
      providers: [
        { provide: JwtService, useValue: jwtService },
        ProductService,
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

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductService>(ProductService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('create', () => {
    it('should create a product', async () => {
      const req = {
        user: {
          userEmail: 'guilherme@test.test',
        },
      };

      const productDto: ProductDto = {
        description: 'description of product',
        name: 'Fogão',
        category: 'eletrodoméstico',
        price: 150,
        stock: 2,
      };

      jest.spyOn(service, 'create').mockResolvedValue(productDto);

      const result = await controller.create(productDto, req);
      productDto;
      expect(result).toEqual({
        description: 'description of product',
        name: 'Fogão',
        category: 'eletrodoméstico',
        price: 150,
        stock: 2,
      });
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const products = [
        {
          id: 1,
          description: 'description of product',
          name: 'Fogão',
          category: 'eletrodoméstico',
          price: 150,
          stock: 2,
        },
        {
          id: 2,
          description: 'description of product 2',
          name: 'Geladeira',
          category: 'eletrodoméstico',
          price: 150,
          stock: 2,
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(products);

      const result = await controller.findAll();

      expect(result).toEqual(products);
    });
  });

  describe('remove', () => {
    it('should remove a product by id', async () => {
      const productToRemove = {
        id: 'product_id',
        description: 'description of product',
        name: 'Fogão',
        category: 'eletrodoméstico',
        price: 150,
        stock: 2,
      };

      const req = {
        user: { _id: 'user_id' },
      };

      jest.spyOn(service, 'remove').mockResolvedValue(true);

      const result = await controller.remove(productToRemove.id, req);

      expect(service.remove).toHaveBeenCalledWith(
        productToRemove.id,
        req.user._id,
      );

      expect(result).toBeTruthy();
    });
  });

  describe('update', () => {
    it('should update a product by id', async () => {
      const req = {
        user: { _id: 'user_id' },
      };

      const product = {
        id: 'product_id',
        description: 'description of product',
        name: 'Fogão',
        category: 'eletrodoméstico',
        price: 150,
        stock: 2,
      };

      const productEdited = {
        id: 'product_id',
        description: 'description of product edited',
        name: 'Geladeira',
        category: 'eletrodoméstico',
        price: 150,
        stock: 2,
      };

      jest.spyOn(service, 'update').mockResolvedValue(true);

      const result = await controller.update(product.id, productEdited, req);

      expect(service.update).toHaveBeenCalledWith(
        product.id,
        productEdited,
        req.user._id,
      );
      expect(result).toBeTruthy();
    });
  });
});
