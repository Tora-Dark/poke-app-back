import { Product } from "./Product";

interface TagProps {
  id?: number | null;
  name: string; // Name is required according to the Prisma schema
  products?: Product[];
}

export class Tag {
  readonly id?: number;
  readonly name!: string; // Name cannot be undefined
  readonly products?: Product[];

  private constructor(props: TagProps) {
    Object.assign(this, props);
  }

  static create(data: Partial<TagProps>): Tag {
    if (!data.name) {
      throw new Error("Tag name is required");
    }

    return new Tag({
      id: data.id ?? undefined,
      name: data.name ?? undefined,
      products: data.products ?? [],
    });
  }
}
