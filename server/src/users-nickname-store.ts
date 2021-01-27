export default class UsersStore {
  private users: string[] = [];

  public saveUser(username: string): void {
    this.users.push(username);
  }

  public deleteUser(username: string): void {
    this.users = this.users.filter((value) => value !== username);
  }

  public isUserExist(username: string): boolean {
    return this.users.includes(username);
  }
}
