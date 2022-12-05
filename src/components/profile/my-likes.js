import React, {useEffect,useState } from "react";
import Profile from './index';
//import TuitDataJson from '../tuits/tuits-data.json';
import Tuits from "../tuits";
import LikeService from '../../services/likes-service';
import UserService from '../../services/user-service';
const Mylikes =() =>{

    const [tuitsdata, setTuitsdata] = useState([]);

    useEffect(() => {
      
        UserService.myProfile().then((myCurrentProfile)=>{

            LikeService.findTuitsLikedByAUser(myCurrentProfile._id)
            .then((tuitsLikedByMe)=>{
                
                for (let tempTuit of tuitsLikedByMe) {
                    setTuitsdata((tuitData)=>[...tempTuit, tuitData]);
                }
            });
        });
        
    }, []);
    
    return(<>
      <Profile />
    <h1><center>My likes</center></h1>
    <Tuits tuits={tuitsdata}/> 
    </>); 
}

export default Mylikes;