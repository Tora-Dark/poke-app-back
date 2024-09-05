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
   * @param data - Data for the product to be created, including possible categories and tags.
   * @returns The created `Product` entity with its relations.
   *
   * Business logic:
   * 1. A `Product` entity is created using the provided data.
   * 2. It is stored in the database, linking the specified categories and tags.
   * 3. Returns the created product, including its relations to categories and tags.
   */
  async create(data: Partial<ProductRequestDTO>): Promise<Product> {
    const entity = Product.create({
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
    });

    const createdEntity = await this.prisma.product.create({
      data: {
        name: entity.name,
        description: entity.description,
        price: entity.price,
        stock: entity.stock,
        categories: {
          connect: data.categories?.map((id) => ({ id })), // Connect categories by ID
        },
        tags: {
          connect: data.tags?.map((id) => ({ id })), // Connect tags by ID
        },
      },
      include: {
        categories: true,
        tags: true,
      },
    });

    return Product.create({
      ...createdEntity,
      categories: createdEntity.categories as Category[],
      tags: createdEntity.tags as Tag[],
    });
  }

  /**
   * Finds a product by its ID, including its associated categories and tags.
   *
   * @param id - The ID of the product to find.
   * @returns The found product or `null` if it doesn't exist.
   *
   * Business logic:
   * 1. The product is searched by its ID.
   * 2. If it exists, it returns the product with its categories and tags; otherwise, returns `null`.
   */
  async findById(id: number): Promise<Product | null> {
    const model = await this.prisma.product.findUnique({
      where: { id },
      include: {
        categories: true,
        tags: true,
      },
    });

    return model
      ? Product.create({
          ...model,
          categories: model.categories as Category[],
          tags: model.tags as Tag[],
        })
      : null;
  }

  /**
   * Updates an existing product with the new data provided.
   *
   * @param id - The ID of the product to update.
   * @param data - The data to update, including possible new categories and tags.
   * @returns The updated `Product` entity.
   *
   * Business logic:
   * 1. The product is searched by its ID and the provided fields are updated.
   * 2. Associated categories and tags are updated using `set` to overwrite the relations.
   * 3. Returns the updated product with its relations.
   */
  async update(id: number, data: Partial<ProductRequestDTO>): Promise<Product> {
    const updatedEntity = await this.prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        categories: {
          set: data.categories?.map((id) => ({ id })), // Update categories
        },
        tags: {
          set: data.tags?.map((id) => ({ id })), // Update tags
        },
      },
      include: {
        categories: true,
        tags: true,
      },
    });

    return Product.create({
      ...updatedEntity,
      categories: updatedEntity.categories as Category[],
      tags: updatedEntity.tags as Tag[],
    });
  }

  /**
   * Deletes a product by its ID.
   *
   * @param id - The ID of the product to delete.
   *
   * Business logic:
   * 1. The product is removed from the database using its ID.
   */
  async delete(id: number): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    });
  }

  /**
   * Retrieves all available products, including their categories and tags.
   *
   * @returns An array of products with their associated categories and tags.
   *
   * Business logic:
   * 1. All products are fetched from the database.
   * 2. They are returned along with their categories and tags.
   */
  async findAll(): Promise<Product[]> {
    const models = await this.prisma.product.findMany({
      include: {
        categories: true,
        tags: true,
      },
    });

    return models.map((model) =>
      Product.create({
        ...model,
        categories: model.categories as Category[],
        tags: model.tags as Tag[],
      })
    );
  }
}
