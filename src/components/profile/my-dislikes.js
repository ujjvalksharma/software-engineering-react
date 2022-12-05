import React, {useEffect,useState } from "react";
import Profile from './index';
//import TuitDataJson from '../tuits/tuits-data.json';
import Tuits from "../tuits";
import DisLike from '../../services/dislikes-service';
import UserService from '../../services/user-service';
const MyDislikes =() =>{

    const [tuitsdata, setTuitsdata] = useState([]);

    useEffect(() => {
      
        UserService.myProfile().then((myCurrentProfile)=>{

            DisLike.findTuitsDislikedByAUser(myCurrentProfile._id)
            .then((tuitsLikedByMe)=>{
                
                for (let tempTuit of tuitsLikedByMe) {
                    setTuitsdata((tuitData)=>[...tempTuit, tuitData]);
                }
            });
        });
        
    }, []);
    
    return(<>
      <Profile />
    <h1><center>My Dislikes</center></h1>
    <Tuits tuits={tuitsdata}/> 
    </>); 
}

export default MyDislikes;