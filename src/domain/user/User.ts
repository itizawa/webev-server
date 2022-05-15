export class User {
  id: string;
  username: string;
  password: string;
  constructor(init: User) {
    this.id = init.id;
    this.username = init.username;
    this.username = init.username;
  }

  public static create(params: Optional<User, 'id'>) {
    return new User({
      // TODO
      id: params.id || '1',
      username: params.username,
      password: params.password,
    });
  }
}
