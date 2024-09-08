import { Expose, plainToClass } from 'class-transformer';

export class CategoryResponseDTO {
  @Expose()
  name!: string;

  @Expose()
  id!: number;

  // Method to transform plain object into CategoryResponseDTO instance
  static fromRaw(rawData: object): CategoryResponseDTO {
    return plainToClass(CategoryResponseDTO, rawData, {
      excludeExtraneousValues: true,
    });
  }

  // Add other fields and transformation logic as needed
}
