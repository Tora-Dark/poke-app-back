import { Expose, plainToClass } from 'class-transformer';

export class TagResponseDTO {
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

  // Method to transform plain object into TagResponseDTO instance
  static fromRaw(rawData: object): TagResponseDTO {
    return plainToClass(TagResponseDTO, rawData, {
      excludeExtraneousValues: true,
    });
  }

  // Add other fields and transformation logic as needed
}
