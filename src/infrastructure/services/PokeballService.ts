import { PrismaClient, Prisma } from "@prisma/client";
import { IPokeballService } from "@domain/interfaces/services/IPokeballService";
import { Pokeball } from "@domain/entities/Pokeball";
import { PokeballRequestDTO } from "@interface/dto/request/PokeballRequestDTO";

export class PokeballService implements IPokeballService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: Partial<PokeballRequestDTO>): Promise<Pokeball> {
    const entity = Pokeball.create({
      name: data.name,
      // Add other properties as needed
    });

    const createdEntity = await this.prisma.pokeball.create({
      data: {
        name: entity.name,
        // Add other properties as needed for Prisma
      },
    });

    return Pokeball.create(createdEntity);
  }

  // Implement other methods as needed, e.g., findById, update, delete, etc.

  async findById(id: number): Promise<Pokeball | null> {
    const model = await this.prisma.pokeball.findUnique({
      where: { id },
    });
    return model ? Pokeball.create(model) : null;
  }

  async update(
    id: number,
    data: Partial<PokeballRequestDTO>
  ): Promise<Pokeball> {
    const updatedEntity = await this.prisma.pokeball.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return Pokeball.create(updatedEntity);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.pokeball.delete({
      where: { id },
    });
  }

  async findAll(): Promise<Pokeball[]> {
    const models = await this.prisma.pokeball.findMany();
    return models.map((model) => Pokeball.create(model));
  }
}
