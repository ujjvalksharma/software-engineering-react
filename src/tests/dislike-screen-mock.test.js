import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import TuitService from "../services/tuits-service";
import axios from "axios";
jest.mock('axios');



test("dislike tuits mocked", async () => {


      const usernames = [
    "alice", "bob", "charlie"
  ];

  let tuits=[];

  for(let i=0;i<usernames.length;i++){

    const tuit={
        _id: i*1000, 
        postedBy: {"username": usernames[i],"_id": '123' },
        tuit: 'first tuit from'+usernames[i],
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
      tuit: 'Hi! This is my first tuit from '+usernames[i]
  }
  tuits.push(tuit);
  }
  
  axios.get.mockImplementation(() =>
    Promise.resolve({ data: { tuits: tuits } })
  );

  const newTuits1 =  await TuitService.findAllTuits();

  render(
    <HashRouter>
      <Tuits tuits={newTuits1.tuits} isTuitStatPresent={false}/>
    </HashRouter>
  );

  const tuit = screen.getByText(/alice@alice/i);
  expect(tuit).toBeInTheDocument();
});