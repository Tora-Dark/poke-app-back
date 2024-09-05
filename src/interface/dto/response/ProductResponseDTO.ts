import { Expose, plainToClass } from 'class-transformer';

export class ProductResponseDTO {
  @Expose()
  name!: string;

  @Expose()
  lastname!: string;

  @Expose()
  age!: number;

  @Expose({ name: 'fullName' })
  getFullName() {
    return `${this.name} ${this.lastname}`; // Adjust logic as necessary
  }

  // Method to transform plain object into ProductResponseDTO instance
  static fromRaw(rawData: object): ProductResponseDTO {
    return plainToClass(ProductResponseDTO, rawData, {
      excludeExtraneousValues: true,
    });
  }

  // Add other fields and transformation logic as needed
}
