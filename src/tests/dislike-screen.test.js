
import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import TuitService, { deleteAllTuitsByUser } from "../services/tuits-service";
import axios from "axios";
import TuitList from "../components/tuits";
import UserService from "../services/user-service";
import DislikeService from "../services/dislikes-service";


test('Render liked tuits', async () => {

//const userids = ['6359de6091bbeb778a1bd617', '6359df7e00d849e6b23c598a', '635c503a9567e5d3fbe978a5']
const userId = '6359de6091bbeb778a1bd617';
const tuitIds = ['635c50ea9567e5d3fbe978b5','635c510e9567e5d3fbe978b8', '635c511c9567e5d3fbe978ba'];

for(let i=0;i<tuitIds.length;i++){
  await DislikeService.createDislike(userId,tuitIds[i]);
}
let tuits =[];
DislikeService.findTuitsDislikedByAUser(userId)
.then((tuitsDislikedByMe)=>{
    
  console.log('tuitsDislikedByMe: '+JSON.stringify(tuitsDislikedByMe));
    for (let i=0;i<tuitsDislikedByMe.length;i++) {
        const tempTuit={
            ...tuitsDislikedByMe[i].dislikedTuit,
            postedBy: tuitsLikedByMe[i].dislikedBy

        };
        tuits.push(tempTuit);
    }
    console.log('tuits: '+JSON.stringify(tuits));

    render( 
      <HashRouter>
        <TuitList tuits={tuits} isTuitStatPresent={false}/>
      </HashRouter>); 
    
    const linkElement = screen.getByText(/@NASAPersevere/i);
    expect(linkElement).toBeInTheDocument();
    
   const deletelikedTuits = async() =>{
    for(let i=0;i<tuitIds.length;i++){
      await DislikeService.deleteDislike(userId,tuitIds[i]);
    }
   }

    deletelikedTuits();

});



 

  });

