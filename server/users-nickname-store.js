class UsersStore {
  constructor() {
    this.users = [];
    this.saveUser = this.saveUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.userExist = this.userExist.bind(this);
  }

  saveUser(username) {
    this.users.push(username);
  }

  deleteUser(username) {
    this.users = this.users.filter((value) => value !== username);
  }

  userExist(username) {
    return this.users.includes(username);
  }
}

exports.UsersStore = UsersStore;
