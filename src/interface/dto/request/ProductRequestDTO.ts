import { IsString, IsNotEmpty, IsOptional, IsNumber,Min,Max } from 'class-validator';

export class ProductRequestDTO {
  // Optional name field with validation if provided
  @IsOptional()
  @IsString({ message: 'Name must be a string if provided.' })
  name?: string;

    // Optional name field with validation if provided
    @IsOptional()
    @IsString({ message: 'Name must be a string if provided.' })
    id?: number;

  // Optional description field with validation if provided
  @IsOptional()
  @IsString({ message: 'Description must be a string if provided.' })
  description?: string;

  // Price field with validation
  @IsNotEmpty({ message: 'Price is required and cannot be empty.' })
  @IsNumber({}, { message: 'Price must be a number.' })
  @Min(0, { message: 'Price must be at least 0.' })
  @Max(1000, { message: 'Price cannot exceed 1000.' })
  price!: number;

  // Stock field with validation
  @IsNotEmpty({ message: 'Stock is required and cannot be empty.' })
  @IsNumber({}, { message: 'Stock must be a number.' })
  stock!: number;

  // Optional categories field with validation
  @IsOptional()
  categories?: number[]; // Assuming categories are identified by IDs

  // Optional tags field with validation
  @IsOptional()
  tags?: number[]; // Assuming tags are identified by IDs

  // Additional fields can be uncommented and used as needed:

  // @IsNotEmpty({ message: 'Title is required and cannot be empty.' })
  // @IsString({ message: 'Title must be a string.' })
  // title!: string;

  // @IsNotEmpty({ message: 'Author is required and cannot be empty.' })
  // @IsString({ message: 'Author must be a string.' })
  // author!: string;

  // @IsNotEmpty({ message: 'Published Date is required.' })
  // @IsDate({ message: 'Published Date must be a valid date.' })
  // publishedDate!: Date;

  // @IsNumber({}, { message: 'Price must be a number.' })
  // @Min(0, { message: 'Price must be at least 0.' })
  // @Max(1000, { message: 'Price cannot exceed 1000.' })
  // price!: number;

  // @IsOptional()
  // @IsString({ message: 'Description must be a string if provided.' })
  // description?: string;

  // @IsPhoneNumber("US", { message: 'Phone number must be valid.' })
  // @IsNotEmpty({ message: 'Phone number is required.' })
  // phoneNumber!: string;
}
