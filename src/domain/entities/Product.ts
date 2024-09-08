import { Category } from "./Category";
import { Tag } from "./Tag";

interface ProductProps {
  id?: number | null;
  name: string; 
  imageUrl: string;
  description?: string | null;
  price: number; 
  stock: number; 
  createdAt?: Date;
  updatedAt?: Date;
  categoryId?: number | null; 
  tags?: Tag[] | number[];
}

export class Product {
  readonly id?: number;
  readonly name!: string; 
  readonly imageUrl!: string; 
  readonly description?: string | null;
  readonly price!: number; 
  readonly stock!: number; 
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly categoryId!: number; 
  readonly tags?: Tag[] | number[];

  private constructor(props: ProductProps) {
    Object.assign(this, props);
  }

  static create(data: ProductProps): Product {
    if (!data.name) {
      throw new Error("Product name is required");
    }
    if (!data.imageUrl) {
      throw new Error("Product image is required");
    }
    return new Product({
      id: data.id ?? undefined,
      name: data.name,
      imageUrl: data.imageUrl,
      description: data.description ?? null,
      price: data.price,
      stock: data.stock,
      createdAt: data.createdAt ?? new Date(),
      updatedAt: data.updatedAt ?? new Date(),
      categoryId: data.categoryId,
      tags: data.tags ?? [],
    });
  }
}
