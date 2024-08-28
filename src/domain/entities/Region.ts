interface RegionProps {
  id?: number | null;
  name?: string | null;
}

export class Region {
  readonly id?: number;
  readonly name?: string | null;

  private constructor(props: RegionProps) {
    Object.assign(this, props);
  }

  static create(data: Partial<RegionProps>): Region {
    return new Region({
      id: data.id ?? null, 
      name: data.name ?? null,
    });
  }
}
