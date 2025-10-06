import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './interfaces/product.interface';

@Controller('api/products')
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);

  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(
    @Body(new ValidationPipe({ transform: true }))
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    try {
      this.logger.log(
        `Recebida solicitação para criar produto: ${createProductDto.name}`,
      );
      return await this.productsService.create(createProductDto);
    } catch (error) {
      this.logger.error(
        'Falha ao criar produto',
        error instanceof Error ? error.stack : String(error),
      );

      if (
        error instanceof Error &&
        error.message === 'Falha ao gerar descrição aprimorada'
      ) {
        throw new HttpException(
          'Falha ao aprimorar descrição do produto. Por favor, tente novamente.',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      throw new HttpException(
        'Erro interno do servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

