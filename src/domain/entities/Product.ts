import { Category } from "./Category";
import { Tag } from "./Tag";

interface ProductProps {
  id?: number | null;
  name?: string | null;
  description?: string | null;
  price?: number | null;
  stock?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
  categories?: Category[];  
  tags?: Tag[];  
}

export class Product {
  readonly id?: number;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly price?: number;
  readonly stock?: number;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly categories?: Category[];
  readonly tags?: Tag[];

  private constructor(props: ProductProps) {
    Object.assign(this, props);
  }

  /**
   * Creates a new instance of `Product` using the provided data.
   * 
   * @param data - The data to create a product entity, including optional fields.
   * @returns A new `Product` instance.
   * 
   * Business logic:
   * 1. Initializes a new `Product` with the provided data or defaults for missing fields.
   * 2. If the `id`, `price`, and `stock` are not provided, they are left undefined, while nullable fields like `name` and `description` default to `null`.
   * 3. Automatically assigns the current date for `createdAt` and `updatedAt` if not provided.
   * 4. Ensures that the `categories` and `tags` arrays are always initialized, even if empty.
   */
  static create(data: Partial<ProductProps>): Product {
    return new Product({
      id: data.id ?? undefined,
      name: data.name ?? null,
      description: data.description ?? null,
      price: data.price ?? undefined,
      stock: data.stock ?? undefined,
      createdAt: data.createdAt ?? new Date(),
      updatedAt: data.updatedAt ?? new Date(),
      categories: data.categories ?? [],
      tags: data.tags ?? [],
    });
  }
}
