interface UserProps {
  id?: number | null;
  name?: string | null;
}

export class User {
  readonly id?: number;
  readonly name?: string | null;

  private constructor(props: UserProps) {
    Object.assign(this, props);
  }

  static create(data: Partial<UserProps>): User {
    return new User({
      id: data.id ?? undefined, 
      name: data.name ?? null,
    });
  }
}
