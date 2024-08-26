interface PokemonProps {
  id: number;
  name?: string | null;
}

export class Pokemon {
  id!: number;
  name!: string | null;

  constructor(props: PokemonProps) {
    Object.assign(this, props);
  }

  static create(data: Partial<PokemonProps>): Pokemon {
    return new Pokemon({
      id: data.id!,
      name: data.name ?? null,
    });
  }
}
