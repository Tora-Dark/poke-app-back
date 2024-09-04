interface UserProps {
  id?: number | null;
  name?: string | null;
  email: string;
}

export class User {
  readonly id?: number;
  readonly name?: string | null;
  readonly email!: string;

  private constructor(props: UserProps) {
    Object.assign(this, props);
  }

  static create(data: Partial<UserProps>): User {
    if (!data.email) {
      throw new Error("Email is required");
    }

    return new User({
      id: data.id ?? undefined,
      name: data.name ?? null,
      email: data.email,
    });
  }
}
