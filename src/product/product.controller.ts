import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Request,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/productDto';
import { AuthGuard } from '../auth/auth.guard';
import { Public } from 'src/auth/decorators/constants';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createProductDto: ProductDto, @Request() req) {
    const user = req.user;
    return this.productService.create(createProductDto, user.userEmail);
  }

  @Get()
  @Public()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: ProductDto,
    @Request() req,
  ) {
    const user = req.user;

    return this.productService.update(id, updateProductDto, user._id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const user = req.user;

    return this.productService.remove(id, user._id);
  }
}
