import {UserList} from "../components/profile/user-list";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import UserService from "../services/user-service";
import AllUsers from '../components/profile/'
import axios from "axios";

jest.mock('axios');

const MOCKED_USERS = [
  {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
  {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
]

test('user list renders static user array', () => {
  render(
    <HashRouter>
      <UserList users={MOCKED_USERS}/>
    </HashRouter>); 
  const linkElement = screen.getByText(/ellen_ripley/i);
  expect(linkElement).toBeInTheDocument();
});

test('user list renders async', async () => {
//  const users = await UserService.findAllUsers();
const users= [ //can make changes
  {username: 'alice', password: 'lv426', email: 'alice@weyland.com', _id: "123"},
  {username: 'bob', password: 'illbeback', email: 'bob@bigjeff.com', _id: "234"},
];
//  console.log('users: '+JSON.stringify(users));
  render(
    <HashRouter>
      <UserList users={users}/>
    </HashRouter>);
  const linkElement = screen.getByText(/alice/i);
  expect(linkElement).toBeInTheDocument();
})

test('user list renders mocked', async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ data: {users: MOCKED_USERS} }));
  const response = await UserService.findAllUsers();
  const users = response.users;

  render(
    <HashRouter>
      <UserList users={users}/>
    </HashRouter>);

  const user = screen.getByText(/ellen_ripley/i);
  expect(user).toBeInTheDocument();
});