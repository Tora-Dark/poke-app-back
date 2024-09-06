import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class TagRequestDTO {

  @IsOptional()
  @IsString({ message: 'Name must be a string if provided.' })
  name?: string;
}
