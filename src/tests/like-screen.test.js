
import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import TuitService, { deleteAllTuitsByUser } from "../services/tuits-service";
import axios from "axios";
import TuitList from "../components/tuits";
import UserService from "../services/user-service";
import LikeService from "../services/likes-service";


test('Render liked tuits', async () => {

const userId = '6359de6091bbeb778a1bd617';
const tuitIds = ['635c50ea9567e5d3fbe978b5','635c510e9567e5d3fbe978b8', '635c511c9567e5d3fbe978ba'];

for(let i=0;i<tuitIds.length;i++){
  await LikeService.createLike(userId,tuitIds[i]);
}
let tuits =[];
const tuitsLikedByMe= await  LikeService.findTuitsLikedByAUser(userId);

for (let i=0;i<tuitsLikedByMe.length;i++) {
  const tuitOwner= await UserService.findUserById(tuitsLikedByMe[i].likedTuit.postedBy);
  const tempTuit={
      ...tuitsLikedByMe[i].likedTuit,
      postedBy: tuitOwner===null?{'username':'tuiterapp'+i}:tuitOwner

  };
    tuits.push(tempTuit);
}
render( 
  <HashRouter>
    <TuitList tuits={tuits} isTuitStatPresent={false}/>
  </HashRouter>); 

const linkElement = screen.getByText(/tuiterapp1@tuiterapp1/i);
expect(linkElement).toBeInTheDocument();
 
for(let i=0;i<tuitIds.length;i++){
  await LikeService.deleteLike(userId,tuitIds[i]);
}

  });

