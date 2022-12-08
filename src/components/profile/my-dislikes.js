import React, {useEffect,useState } from "react";
import Profile from './index';
//import TuitDataJson from '../tuits/tuits-data.json';
import Tuits from "../tuits";
import DisLikeService from '../../services/dislikes-service';
import UserService from '../../services/user-service';
import { useNavigate } from "react-router-dom";
const MyDislikes =() =>{

    const [tuitsdata, setTuitsdata] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem('profile') === null ? '-1' :  JSON.parse(localStorage.getItem('profile'))._id;
    useEffect(() => {
      
        const tempProfile = localStorage.getItem('profile');
        if(tempProfile!== undefined && tempProfile!== null){
      const profileData =JSON.parse(tempProfile);
      
      DisLikeService.findTuitsDislikedByAUser(profileData._id)
      .then((tuitsLikedByMe)=>{
          
          for (let i=0;i<tuitsLikedByMe.length;i++) {
            const tempTuit={
                ...tuitsLikedByMe[i].dislikedTuit,
                postedBy: tuitsLikedByMe[i].dislikedBy

            };
              setTuitsdata((tuitData)=>[tempTuit, ...tuitData]);
          }
      });

        }

    }, []);
    
    return(<>

{userId === '-1' && <h1>PLease login to access the page!</h1>}
{userId !== '-1' &&<>
      <Profile />
    
      <ul className="nav nav-tabs">
    <li onClick={()=>navigate('../profile/mytuits')}><a className="#">My Tuits</a></li>
    <li className="active"  onClick={()=>navigate('../profile/mydislike')} ><a className="#">My  Dislike Tuits</a></li>
    <li  onClick={()=>navigate('../profile/mylikes')}  ><a className="#">My Like Tuits</a></li>
  </ul>
    <Tuits tuits={tuitsdata}/> 
    </>
}
    </>); 
}

export default MyDislikes;