import React,{useEffect, useState} from "react";
import {Routes, Route} from "react-router-dom";
import { useNavigate } from "react-router-dom";
/*
import MyTuits from "./my-tuits";
import TuitsAndReplies
  from "./tuits-and-replies";
import Media from "./media"; */
import MyLikes from "./my-likes";

const Profile = () => {

  const [currentUser, setCurrentUser] = useState({});
  const userId = localStorage.getItem('profile') === null ? '-1' :  JSON.parse(localStorage.getItem('profile'))._id;
  const navigate = useNavigate();
  useEffect(() => {
    const tempProfile = localStorage.getItem('profile');
    if(tempProfile!== undefined && tempProfile!== null){
  const data =JSON.parse(tempProfile);
  setCurrentUser(data);
    }
     

  }, [])


  const logout =()=>{
   localStorage.removeItem('profile');
   navigate('../login');
  }
  return(<>
    {userId === '-1' && <h1>PLease login to access the page!</h1>}
{userId !== '-1' &&
    <div>
      <h4>{currentUser.username}</h4>
      <h6>@{currentUser.username}</h6>
      <button onClick={()=> logout()}>
        Logout</button>
        <br />
        <br />
    </div>
}
</>
  );
};
export default Profile;