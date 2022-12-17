
import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import TuitService, { deleteAllTuitsByUser } from "../services/tuits-service";
import axios from "axios";
import TuitList from "../components/tuits";
import UserService from "../services/user-service";
import DislikeService from "../services/dislikes-service";
import LikeService from "../services/likes-service";


test('Render liked tuits', async () => {
  
const user1= await UserService.createUser({'username': 'ujj', 'password':'ujj'});
let userId=user1._id;
let tuitIds = [];

for(let i=0;i<1;i++){
  let tuit= await TuitService.createTuit(userId, {'tuit' :'new tuit '+i});
  tuitIds.push(tuit._id);
}

for(let i=0;i<tuitIds.length;i++){
  await DislikeService.createDislike(userId,tuitIds[i]);
}
let tuits =[];
const tuitsLikedByMe= await  DislikeService.findTuitsDislikedByAUser(userId);

for (let i=0;i<tuitsLikedByMe.length;i++) {
  const tuitOwner= await UserService.findUserById(tuitsLikedByMe[i].dislikedTuit.postedBy);
  const tempTuit={
      ...tuitsLikedByMe[i].dislikedTuit,
      postedBy: tuitOwner===null?{'username':'tuiterapp'+i}:tuitOwner

  };
    tuits.push(tempTuit);
}
render( 
  <HashRouter>
    <TuitList tuits={tuits} isTuitStatPresent={false}/>
  </HashRouter>); 

const linkElement = screen.getByText(/ujj@ujj/i);
expect(linkElement).toBeInTheDocument();
 
for(let i=0;i<tuitIds.length;i++){
  await DislikeService.deleteDislike(userId,tuitIds[i]);
}

for(let i=0;i<1;i++){
  await TuitService.deleteTuit(tuitIds[i]);
}
await UserService.deleteUsersByUsername('ujj');

  });

