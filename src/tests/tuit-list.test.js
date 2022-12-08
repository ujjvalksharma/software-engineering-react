
import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import TuitService from "../services/tuits-service";
import axios from "axios";
import TuitList from "../components/tuits";
import UserService from "../services/user-service";

test('tuit list renders static tuit array', () => {

  const MOCKED_USERNAMES = [
    "alice", "bob", "charlie"
  ];

  let MOCKED_TUITS=[];

  for(let i=0;i<MOCKED_USERNAMES.length;i++){

    const tuit={
        _id: i*1000, 
        postedBy: {"username": MOCKED_USERNAMES[i],"_id": '123' },
        tuit: 'first tuit from'+MOCKED_USERNAMES[i],
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
      tuit: 'Hi! This is my first tuit from '+MOCKED_USERNAMES[i]
  }
    MOCKED_TUITS.push(tuit);
  }
// console.log(JSON.stringify(MOCKED_TUITS));
  
    render( 
      <HashRouter>
        <TuitList tuits={MOCKED_TUITS} isTuitStatPresent={false}/>
      </HashRouter>); 

    const linkElement = screen.getByText(/alice@alice/i);
    expect(linkElement).toBeInTheDocument();

  
 
    });

test('tuit list renders async', async () => {
  
  const tuits = await TuitService.findAllTuits();
  let tempTuits=[]
  for(let i=0;i<tuits.length;i++){

    const user = await UserService.findUserById(tuits[i].postedBy);
    if(user==null)
    tempTuits.push({...tuits[i], postedBy:{username:'tuiterapp'+i} });
    else{
      tempTuits.push({...tuits[i], postedBy:user });
    }
  }
  render( 
    <HashRouter>
      <TuitList tuits={tempTuits} isTuitStatPresent={false}/>
    </HashRouter>); 

  const linkElement = screen.getByText(/tuiterapp1@tuiterapp1/i);
  expect(linkElement).toBeInTheDocument();
 

});


