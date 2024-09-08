import { Product } from "./Product";

interface CategoryProps {
  id?: number | null;
  name: string; 
  products?: Product[]; 
  createdAt?: Date;
  updatedAt?: Date;
}

export class Category {
  readonly id?: number;
  readonly name!: string; 
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
      name: data.name, 
      products: data.products ?? [], 
      createdAt: data.createdAt ?? new Date(),
      updatedAt: data.updatedAt ?? new Date(),
    });
  }
}
