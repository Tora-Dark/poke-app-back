import { Product } from "./Product";

interface CategoryProps {
  id?: number | null;
  name: string; // Name is required according to the Prisma schema
  products?: Product[]; // Omit in creation if not managed manually
  createdAt?: Date;
  updatedAt?: Date;
}

export class Category {
  readonly id?: number;
  readonly name!: string; // Name cannot be undefined
  readonly products?: Product[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  private constructor(props: CategoryProps) {
    Object.assign(this, props);
  }

  static create(data: Partial<CategoryProps>): Category {
    if (!data.name) {
      throw new Error("Product name is required");
    }

    return new Category({
      id: data.id ?? undefined,
      name: data.name, // Ensures that name is always provided
      products: data.products ?? [], // Initializes products as an empty array if not provided
      createdAt: data.createdAt ?? new Date(),
      updatedAt: data.updatedAt ?? new Date(),
    });
  }
}
