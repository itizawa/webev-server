export class User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(init: User) {
    this.id = init.id;
    this.username = init.username;
    this.email = init.email;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
  }

  public static create(params: Optional<User, 'id'>) {
    return new User({
      id: params.id || '1',
      username: params.username,
      email: params.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
