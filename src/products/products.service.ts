import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './interfaces/product.interface';
import { GeminiService } from '../gemini/gemini.service';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(private readonly geminiService: GeminiService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      this.logger.log(`Criando produto: ${createProductDto.name}`);

      const enhancedDescription =
        await this.geminiService.enhanceProductDescription(
          createProductDto.name,
          createProductDto.description,
          createProductDto.price,
        );

      const product: Product = {
        ...createProductDto,
        enhancedDescription,
      };

      this.logger.log(`Produto criado com sucesso: ${createProductDto.name}`);
      return product;
    } catch (error) {
      this.logger.error(
        `Falha ao criar produto: ${createProductDto.name}`,
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }
}

