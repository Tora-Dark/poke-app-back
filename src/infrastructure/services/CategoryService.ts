import { PrismaClient } from "@prisma/client";
import { ICategoryService } from "@domain/interfaces/services/ICategoryService";
import { Category } from "@domain/entities/Category";
import { CategoryRequestDTO } from "@interface/dto/request/CategoryRequestDTO";

export class CategoryService implements ICategoryService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient(); // Inicializa el cliente de Prisma
  }

  async create(data: Partial<CategoryRequestDTO>): Promise<Category> {
    // Crear una instancia de Category con los datos proporcionados
    const entity = Category.create({
      name: data.name,
    });

    // Crear la categoría en la base de datos
    const createdEntity = await this.prisma.category.create({
      data: {
        name: entity.name,
      },
    });

    // Retornar la instancia de Category creada
    return Category.create(createdEntity);
  }

  async findById(id: number): Promise<Category | null> {
    // Buscar una categoría por su ID
    const model = await this.prisma.category.findUnique({
      where: { id },
    });

    // Retornar la instancia de Category o null si no se encuentra
    return model ? Category.create(model) : null;
  }

  async update(
    id: number,
    data: Partial<CategoryRequestDTO>
  ): Promise<Category> {
    // Actualizar una categoría y retornar la instancia actualizada
    const updatedEntity = await this.prisma.category.update({
      where: { id },
      data: {
        name: data.name,
      },
    });

    // Retornar la instancia de Category actualizada
    return Category.create(updatedEntity);
  }

  async delete(id: number): Promise<void> {
    // Eliminar una categoría por su ID
    await this.prisma.category.delete({
      where: { id },
    });
  }

  async findAll(): Promise<Category[]> {
    // Obtener todas las categorías
    const models = await this.prisma.category.findMany();

    // Mapear cada resultado a una instancia de Category
    return models.map((model) => Category.create(model));
  }
}
