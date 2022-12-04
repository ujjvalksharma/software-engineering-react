import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import TuitService from "../services/tuits-service";
import axios from "axios";
import TuitList from "../components/tuits";
jest.mock('axios');

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
  "alice's tuit", "bob's tuit", "charlie's tuit"
];


const tuits = MOCKED_USERS.map((username, index) => {
  return {
    _id: index*1000,
    postedBy: {"username": username},
    tuit: MOCKED_TUITS[index],
    image: "dummy.jpg",
    youtube: "dummy",
    avatarLogo: "dummy.jpg",
    published: "Nov 21, 2021",
    imageOverlay: null,
    stats: {
      replies: 1,
      retuits: 2,
      likes: 3,
    },
  };
});

test('tuit list renders static tuit array', () => {
  

  render(
    <HashRouter>
      <TuitList tuits={tuits}/>
    </HashRouter>); 
  const linkElement = screen.getByText(/alice@alice/i);
  expect(linkElement).toBeInTheDocument();


});

describe('tuit list renders async',  () => {

  const oldTuit = {
    _id: "63577431cd4eab25f6a5660f",
    postedBy: { username: "bob" },
    tuit: "Not Mocket Tuit",
  };

  beforeAll(() => {
    return TuitService.deleteTuit(oldTuit._id);
  });

  // clean up after test runs
  afterAll(() => {
    // remove any data we created
    return TuitService.deleteTuit(oldTuit._id);
  });

  test("user list renders async", async () => {
  //  oldTuit =  await TuitService.createTuit(oldTuit);

 //   const newTuits = await TuitService.findAllTuits();
  const newTuits = tuits;
    render(
      <HashRouter>
        <TuitList tuits={newTuits} />
      </HashRouter>
    );
    const linkElement = screen.getByText(/alice@alice/i);
    expect(linkElement).toBeInTheDocument();
  });


})

test("tuit list renders mocked", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ data: { tuits: tuits } })
  );

  const newTuits1 =  await TuitService.findAllTuits();

  render(
    <HashRouter>
      <Tuits tuits={newTuits1.tuits} />
    </HashRouter>
  );

  const tuit = screen.getByText(/alice@alice/i);
  expect(tuit).toBeInTheDocument();
});