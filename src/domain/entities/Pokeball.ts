interface PokeballProps {
  id?: number | null;
  name?: string | null;
}

export class Pokeball {
  readonly id?: number;
  readonly name?: string | null;

  private constructor(props: PokeballProps) {
    Object.assign(this, props);
  }

  static create(data: Partial<PokeballProps>): Pokeball {
    return new Pokeball({
      id: data.id ?? null, 
      name: data.name ?? null,
    });
  }
}
