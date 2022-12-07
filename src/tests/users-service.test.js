import UserService from "../services/user-service";

describe('createUser', () => {
  // sample user to insert
  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  };

  test('can insert new users with REST API', async () => {

   const deletedUsername= await UserService.deleteUsersByUsername(ripley.username)
    // insert new user in the database
    const newUser = await UserService.createUser(ripley);

    // verify inserted user's properties match parameter user
    expect(newUser.username).toEqual(ripley.username);
    expect(newUser.password).toEqual(ripley.password);
    expect(newUser.email).toEqual(ripley.email);
    const status = await UserService.deleteUsersByUsername(ripley.username)
  });
});

describe('deleteUsersByUsername', () => {

  // sample user to delete
  const sowell = {
    username: 'thommas_sowell',
    password: 'compromise',
    email: 'compromise@solutions.com'
  };

  test('can delete users from REST API by username', async () => {
    // delete a user by their username. Assumes user already exists
    const newUser = await UserService.createUser(sowell);

    const status = await UserService.deleteUsersByUsername(sowell.username);

    // verify we deleted at least one user by their username
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });
});

describe('findUserById',  () => {
  // sample user we want to retrieve
  const adam = {
    username: 'adam_smith',
    password: 'not0sum',
    email: 'wealth@nations.com'
  };

  test('can retrieve user from REST API by primary key', async () => {
    // insert the user in the database
    const newUser = await UserService.createUser(adam);

    // verify new user matches the parameter user
    expect(newUser.username).toEqual(adam.username);
    expect(newUser.password).toEqual(adam.password);
    expect(newUser.email).toEqual(adam.email);

    // retrieve the user from the database by its primary key
    const existingUser = await UserService.findUserById(newUser._id);

    // verify retrieved user matches parameter user
    expect(existingUser.username).toEqual(adam.username);
    expect(existingUser.password).toEqual(adam.password);
    expect(existingUser.email).toEqual(adam.email);
  });
});


describe('findAllUsers',  () => {
/*
  // sample users we'll insert to then retrieve
  const usernames = [
    "larry", "curley", "moe"
  ];

  // setup data before test
  beforeAll(() =>
    // insert several known users
    usernames.map(username =>
      createUser({
        username,
        password: `${username}123`,
        email: `${username}@stooges.com`
      })
    )
  );

  // clean up after ourselves
  afterAll(() =>
    // delete the users we inserted
    usernames.map(username =>
      deleteUsersByUsername(username)
    )
  );
*/
  test('can retrieve all users from REST API', async () => {


      const usernames = [
    "larry", "curley", "moe"
  ];

   usernames.map(username =>
    UserService.createUser({
        username,
        password: `${username}123`,
        email: `${username}@stooges.com`
      })
    )

    // retrieve all the users
    const users = await UserService.findAllUsers();

    // there should be a minimum number of users
    expect(users.length).toBeGreaterThanOrEqual(usernames.length);

    // let's check each user we inserted
    const usersWeInserted = users.filter(
      user => usernames.indexOf(user.username) >= 0);

    // compare the actual users in database with the ones we sent
    usersWeInserted.forEach(user => {
      const username = usernames.find(username => username === user.username);
      expect(user.username).toEqual(username);
      expect(user.password).toEqual(`${username}123`);
      expect(user.email).toEqual(`${username}@stooges.com`);
    });

    usernames.map(username =>
       UserService.deleteUsersByUsername(username)
    )

  });


});
