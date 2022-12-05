import React, {useEffect,useState } from "react";
import Profile from './index';
//import TuitDataJson from '../tuits/tuits-data.json';
import Tuits from "../tuits";
import TuitService from '../../services/tuits-service';
import { useNavigate } from "react-router-dom";
const MyTuits =() =>{

    const [tuitsdata, setTuitsdata] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
      
        const tempProfile = localStorage.getItem('profile');
        if(tempProfile!== undefined && tempProfile!== null){
      const profileData =JSON.parse(tempProfile);
      
      TuitService.findTuitByUser(profileData._id)
      .then((tuitsLikedByMe)=>{
          
          for (let i=0;i<tuitsLikedByMe.length;i++) {
              console.log('json: '+JSON.stringify(tuitsLikedByMe[i]));
              setTuitsdata((tuitData)=>[tuitsLikedByMe[i], ...tuitData]);
          }
      });

        }

    }, []);
    
    return(<>
      <Profile />
      <ul className="nav nav-tabs">
    <li className="active" onClick={()=>navigate('../profile/mytuits')}><a className="#">My Tuits</a></li>
    <li   onClick={()=>navigate('../profile/mydislike')} ><a className="#">My  Dislike Tuits</a></li>
    <li  onClick={()=>navigate('../profile/mylikes')}  ><a className="#">My Like Tuits</a></li>
  </ul>
    <h1><center>My Tuits</center></h1>
    <Tuits tuits={tuitsdata}/> 
    </>); 
}

export default MyTuits;