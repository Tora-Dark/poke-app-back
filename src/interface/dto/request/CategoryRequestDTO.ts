import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CategoryRequestDTO {

  @IsNotEmpty({ message: 'Name is required.' })
  @IsString({ message: 'Name must be a string.' })
  name!: string;
  
}
