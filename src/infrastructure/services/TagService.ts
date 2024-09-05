import { PrismaClient } from '@prisma/client';
import { ITagService } from '@domain/interfaces/services/ITagService';
import { Tag } from '@domain/entities/Tag';
import { TagRequestDTO } from '@interface/dto/request/TagRequestDTO';

export class TagService implements ITagService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient(); // Inicializa el cliente de Prisma
  }

  async create(data: Partial<TagRequestDTO>): Promise<Tag> {
    // Crear una instancia de Tag con los datos proporcionados
    const entity = Tag.create({
      name: data.name,
    });

    // Crear la etiqueta en la base de datos
    const createdEntity = await this.prisma.tag.create({
      data: {
        name: entity.name,
      }
    });

    // Retornar la instancia de Tag creada
    return Tag.create(createdEntity);
  }

  async findById(id: number): Promise<Tag | null> {
    // Buscar una etiqueta por su ID
    const model = await this.prisma.tag.findUnique({
      where: { id }
    });

    // Retornar la instancia de Tag o null si no se encuentra
    return model ? Tag.create(model) : null;
  }

  async update(id: number, data: Partial<TagRequestDTO>): Promise<Tag> {
    // Actualizar una etiqueta y retornar la instancia actualizada
    const updatedEntity = await this.prisma.tag.update({
      where: { id },
      data: {
        name: data.name,
      }
    });

    // Retornar la instancia de Tag actualizada
    return Tag.create(updatedEntity);
  }

  async delete(id: number): Promise<void> {
    // Eliminar una etiqueta por su ID
    await this.prisma.tag.delete({
      where: { id }
    });
  }

  async findAll(): Promise<Tag[]> {
    // Obtener todas las etiquetas
    const models = await this.prisma.tag.findMany();

    // Mapear cada resultado a una instancia de Tag
    return models.map((model) => Tag.create(model));
  }
}
