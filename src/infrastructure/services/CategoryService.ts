import { PrismaClient } from "@prisma/client";
import { ICategoryService } from "@domain/interfaces/services/ICategoryService";
import { Category } from "@domain/entities/Category";
import { CategoryRequestDTO } from "@interface/dto/request/CategoryRequestDTO";

export class CategoryService implements ICategoryService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * @description Creates a new category in the database
   * @param {Partial<CategoryRequestDTO>} data - Partial data from CategoryRequestDTO to create the category
   * @returns {Promise<Category>} - Returns a promise that resolves to the created Category instance
   */
  async create(data: Partial<CategoryRequestDTO>): Promise<Category> {
    const entity = Category.create({
      name: data.name,
    });

    const createdEntity = await this.prisma.category.create({
      data: {
        name: entity.name,
      },
    });

    return Category.create(createdEntity);
  }

  /**
   * @description Finds a category by its ID
   * @param {number} id - The ID of the category to find
   * @returns {Promise<Category | null>} - Returns a promise that resolves to the found Category or null if not found
   */
  async findById(id: number): Promise<Category | null> {
    const model = await this.prisma.category.findUnique({
      where: { id },
    });

    return model ? Category.create(model) : null;
  }

  /**
   * @description Updates a category by its ID
   * @param {number} id - The ID of the category to update
   * @param {Partial<CategoryRequestDTO>} data - Partial data from CategoryRequestDTO to update the category
   * @returns {Promise<Category>} - Returns a promise that resolves to the updated Category instance
   */
  async update(id: number, data: Partial<CategoryRequestDTO>): Promise<Category> {
    const updatedEntity = await this.prisma.category.update({
      where: { id },
      data: {
        name: data.name,
      },
    });

    return Category.create(updatedEntity);
  }

  /**
   * @description Deletes a category by its ID
   * @param {number} id - The ID of the category to delete
   * @returns {Promise<void>} - Returns a promise that resolves when the category is deleted
   */
  async delete(id: number): Promise<void> {
    if (!(await this.findById(id))) {
      throw new Error('Category not found');
    }
    await this.prisma.category.delete({
      where: { id },
    });
  }

  /**
   * @description Finds all categories in the database
   * @returns {Promise<Category[]>} - Returns a promise that resolves to an array of Category instances
   */
  async findAll(): Promise<Category[]> {
    const models = await this.prisma.category.findMany();

    return models.map((model) => Category.create(model));
  }
}
