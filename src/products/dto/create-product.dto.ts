import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value as string))
  price: number;
}

