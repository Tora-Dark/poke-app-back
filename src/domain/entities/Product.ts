import { Category } from "./Category";
import { Tag } from "./Tag";

interface ProductProps {
  id?: number | null;
  name: string; // Required field
  description?: string | null;
  price: number; // Required field
  stock: number; // Required field
  createdAt?: Date;
  updatedAt?: Date;
  categoryId?: number | null; // Optional, as category is not required
  tags?: Tag[];
}

export class Product {
  readonly id?: number;
  readonly name!: string; // Required field
  readonly description?: string | null;
  readonly price!: number; // Required field
  readonly stock!: number; // Required field
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly categoryId!: number | null; // Optional, as category is not required
  readonly tags?: Tag[];

  private constructor(props: ProductProps) {
    Object.assign(this, props);
  }

  static create(data: ProductProps): Product {
    if (!data.name) {
      throw new Error("Category name is required");
    }
    return new Product({
      id: data.id ?? undefined,
      name: data.name,
      description: data.description ?? null,
      price: data.price,
      stock: data.stock,
      createdAt: data.createdAt ?? new Date(),
      updatedAt: data.updatedAt ?? new Date(),
      categoryId: data.categoryId ?? null,
      tags: data.tags ?? [],
    });
  }
}
