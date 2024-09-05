import { Expose, plainToClass } from 'class-transformer';

export class CategoryResponseDTO {
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

  // Method to transform plain object into CategoryResponseDTO instance
  static fromRaw(rawData: object): CategoryResponseDTO {
    return plainToClass(CategoryResponseDTO, rawData, {
      excludeExtraneousValues: true,
    });
  }

  // Add other fields and transformation logic as needed
}
