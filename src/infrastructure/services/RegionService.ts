import { PrismaClient, Prisma } from '@prisma/client';
import { IRegionService } from '@domain/interfaces/services/IRegionService';
import { Region } from '@domain/entities/Region';
import { RegionRequestDTO } from '@interface/dto/request/RegionRequestDTO';

export class RegionService implements IRegionService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: Partial<RegionRequestDTO>): Promise<Region> {
    const entity = Region.create({
      name: data.name,
      // Add other properties as needed
    });
    
    const createdEntity = await this.prisma.region.create({
      data: {
        name: entity.name,
        // Add other properties as needed for Prisma
      },
    });

    return Region.create(createdEntity);
  }

  // Implement other methods as needed, e.g., findById, update, delete, etc.
  
  async findById(id: number): Promise<Region | null> {
    const model = await this.prisma.region.findUnique({
      where: { id },
    });
    return model ? Region.create(model) : null;
  }

  async update(id: number, data: Partial<RegionRequestDTO>): Promise<Region> {
    const updatedEntity = await this.prisma.region.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return Region.create(updatedEntity);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.region.delete({
      where: { id },
    });
  }

  async findAll(): Promise<Region[]> {
    const models = await this.prisma.region.findMany();
    return models.map((model) => Region.create(model));
  }

}
