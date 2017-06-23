const expect = require("expect");
const Users = require("../utils/users");

describe("Users", () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: "1",
        name: "Luis",
        room: "Node Devs"
      },
      {
        id: "2",
        name: "Brodey",
        room: "React Devs"
      },
      {
        id: "3",
        name: "Jesus",
        room: "Node Devs"
      }
    ];
  });
  it("Should add new user", () => {
    const users = new Users();
    const user = {
      id: "111",
      name: "Anthony",
      room: "JS Gods"
    };
    const res = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });
  it("Should remove a user", () => {
      const deletedUser = users.removeUser('1');
      expect(users.users.length).toBe(2);
      expect(deletedUser.id).toBe('1')
  });
  it("Should not remove a user", () => {
      const deletedUser = users.removeUser('33');
      expect(users.users.length).toBe(3);
      expect(deletedUser).toNotExist()
  });
  it("Should return a user", () => {
    const gotUser = users.getUser('1');
    expect(gotUser.id).toBe('1');
  });
  it("Should not return a user", () => {
    const gotUser = users.getUser('33');
    expect(gotUser).toNotExist();
  });
  it("Should return Noders", () => {
    const userList = users.getUserList("Node Devs");
    expect(userList).toEqual(["Luis", "Jesus"]);
  });
  it("Should return React Dev", () => {
    const userList = users.getUserList("React Devs");
    expect(userList).toEqual(["Brodey"]);
  });
});
