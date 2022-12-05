import React, {useEffect,useState } from "react";
import Profile from './index';
//import TuitDataJson from '../tuits/tuits-data.json';
import Tuits from "../tuits";
import TuitService from '../../services/tuits-service';
import UserService from '../../services/user-service';
const MyTuits =() =>{

    const [tuitsdata, setTuitsdata] = useState([]);

    useEffect(() => {
      
        UserService.myProfile().then((myCurrentProfile)=>{

            TuitService.findTuitByUser(myCurrentProfile._id)
            .then((tuitsLikedByMe)=>{
                
                for (let tempTuit of tuitsLikedByMe) {
                    setTuitsdata((tuitData)=>[...tempTuit, tuitData]);
                }
            });
        });
        
    }, []);
    
    return(<>
      <Profile />
    <h1><center>My Tuits</center></h1>
    <Tuits tuits={tuitsdata}/> 
    </>); 
}

export default MyTuits;