import { Product } from "./Product";

interface CategoryProps {
  id?: number | null;
  name?: string | null;
  products?: Product[];
}

export class Category {
  readonly id?: number;
  readonly name?: string | null;
  readonly products?: Product[];

  private constructor(props: CategoryProps) {
    Object.assign(this, props);
  }

  static create(data: Partial<CategoryProps>): Category {
    return new Category({
      id: data.id ?? undefined,
      name: data.name ?? null,
      products: data.products ?? [],
    });
  }
}
