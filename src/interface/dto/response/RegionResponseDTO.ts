import { Expose, plainToClass } from 'class-transformer';

export class RegionResponseDTO {
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

  // Method to transform plain object into RegionResponseDTO instance
  static fromRaw(rawData: object): RegionResponseDTO {
    return plainToClass(RegionResponseDTO, rawData, {
      excludeExtraneousValues: true,
    });
  }

  // Add other fields and transformation logic as needed
}
