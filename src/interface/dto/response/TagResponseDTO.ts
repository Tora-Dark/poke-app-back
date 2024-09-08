import { Expose, plainToClass } from 'class-transformer';

export class TagResponseDTO {
  @Expose()
  name!: string;

  @Expose()
  id!: number;
  // Method to transform plain object into TagResponseDTO instance
  static fromRaw(rawData: object): TagResponseDTO {
    return plainToClass(TagResponseDTO, rawData, {
      excludeExtraneousValues: true,
    });
  }

  // Add other fields and transformation logic as needed
}
