import { Product } from "./Product";

interface TagProps {
  id?: number | null;
  name?: string | null;
  products?: Product[];
}

export class Tag {
  readonly id?: number;
  readonly name?: string | null;
  readonly products?: Product[];

  private constructor(props: TagProps) {
    Object.assign(this, props);
  }

  static create(data: Partial<TagProps>): Tag {
    return new Tag({
      id: data.id ?? undefined,
      name: data.name ?? null,
      products: data.products ?? [],
    });
  }
}
