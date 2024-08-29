import { Expose, plainToClass } from 'class-transformer';

export class PokeballResponseDTO {
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

  // Method to transform plain object into PokeballResponseDTO instance
  static fromRaw(rawData: object): PokeballResponseDTO {
    return plainToClass(PokeballResponseDTO, rawData, {
      excludeExtraneousValues: true,
    });
  }

  // Add other fields and transformation logic as needed
}
