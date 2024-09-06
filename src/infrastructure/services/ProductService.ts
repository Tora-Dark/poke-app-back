import { PrismaClient } from "@prisma/client";
import { IProductService } from "@domain/interfaces/services/IProductService";
import { Product } from "@domain/entities/Product";
import { ProductRequestDTO } from "@interface/dto/request/ProductRequestDTO";
import { Category } from "@domain/entities/Category";
import { Tag } from "@domain/entities/Tag";

export class ProductService implements IProductService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Creates a new product with its associated categories and tags.
   *
   * @param data - Data for the product to be created, including possible tags.
   * @returns The created `Product` entity with its relations.
   */
  async create(data: ProductRequestDTO): Promise<Product> {
    const createdEntity = await this.prisma.product.create({
      data: {
        name: data.name,
        description: data.description ?? null,
        price: data.price,
        stock: data.stock,
        category: { connect: { id: data.categoryId } },
        tags: data.tags ? { connect: data.tags.map(id => ({ id })) } : undefined,
      },
      include: {
        category: true,
        tags: true,
      },
    });

    return Product.create({
      ...createdEntity,
      categoryId: createdEntity.category.id,
      tags: createdEntity.tags as Tag[],
    });
  }

  /**
   * Finds a product by its ID, including its associated categories and tags.
   *
   * @param id - The ID of the product to find.
   * @returns The found product or `null` if it doesn't exist.
   */
  async findById(id: number): Promise<Product | null> {
    const model = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        tags: true,
      },
    });

    return model
      ? Product.create({
          ...model,
          categoryId: model.category.id,
          tags: model.tags as Tag[],
        })
      : null;
  }

  /**
   * Updates an existing product with the new data provided.
   *
   * @param id - The ID of the product to update.
   * @param data - The data to update, including possible new tags.
   * @returns The updated `Product` entity.
   */
  async update(id: number, data: ProductRequestDTO): Promise<Product> {
    const updatedEntity = await this.prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description ?? null,
        price: data.price,
        stock: data.stock,
        category: { connect: { id: data.categoryId } },
        tags: data.tags ? { connect: data.tags.map(id => ({ id })) } : undefined,
      },
      include: {
        category: true,
        tags: true,
      },
    });

    return Product.create({
      ...updatedEntity,
      categoryId: updatedEntity.category.id,
      tags: updatedEntity.tags as Tag[],
    });
  }

  /**
   * Deletes a product by its ID.
   *
   * @param id - The ID of the product to delete.
   */
  async delete(id: number): Promise<void> {
    if (!(await this.findById(id))) {
      throw new Error('Product not found');
    }
    await this.prisma.product.delete({
      where: { id },
    });
  }

  /**
   * Retrieves all available products, including their categories and tags.
   *
   * @returns An array of products with their associated categories and tags.
   */
  async findAll(): Promise<Product[]> {
    const models = await this.prisma.product.findMany({
      include: {
        category: true,
        tags: true,
      },
    });

    return models.map((model) =>
      Product.create({
        ...model,
        categoryId: model.category.id,
        tags: model.tags as Tag[],
      })
    );
  }
}
