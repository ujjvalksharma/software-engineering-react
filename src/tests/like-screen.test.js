
import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import axios from "axios";
import TuitList from "../components/tuits";
import UserService from "../services/user-service";
import TuitService from "../services/tuits-service";
import LikeService from "../services/likes-service";
import Tuit from "../components/tuits/tuit";


test('Render liked tuits', async () => {

  const user1= await UserService.createUser({'username': 'ujj', 'password':'ujj'});
  let userId=user1._id;
  let tuitIds = [];

  for(let i=0;i<1;i++){
    let tuit= await TuitService.createTuit(userId, {'tuit' :'new tuit '+i});
    tuitIds.push(tuit._id);
  }

  console.log('I am here1');
for(let i=0;i<tuitIds.length;i++){
  await LikeService.createLike(userId,tuitIds[i]);
}
let tuits =[];
const tuitsLikedByMe= await  LikeService.findTuitsLikedByAUser(userId);
console.log('I am here2');
for (let i=0;i<tuitsLikedByMe.length;i++) {
  const tuitOwner= await UserService.findUserById(tuitsLikedByMe[i].likedTuit.postedBy);
  const tempTuit={
      ...tuitsLikedByMe[i].likedTuit,
      postedBy: tuitOwner===null?{'username':'tuiterapp'+i}:tuitOwner

  };
    tuits.push(tempTuit);
}
console.log('I am here3');
render( 
  <HashRouter>
    <TuitList tuits={tuits} isTuitStatPresent={false}/>
  </HashRouter>); 

const linkElement = screen.getByText(/ujj@ujj/i);
expect(linkElement).toBeInTheDocument();
 
for(let i=0;i<tuitIds.length;i++){
  await LikeService.deleteLike(userId,tuitIds[i]);
}
for(let i=0;i<1;i++){
  await TuitService.deleteTuit(tuitIds[i]);
}
await UserService.deleteUsersByUsername('ujj');

  });

