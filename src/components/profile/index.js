import React from "react";
import {Routes, Route} from "react-router-dom";
/*
import MyTuits from "./my-tuits";
import TuitsAndReplies
  from "./tuits-and-replies";
import Media from "./media"; */
import MyLikes from "./my-likes";

const Profile = () => {

  const logout =()=>{
    alert('logout button clicked');
  }
  return(
    <div>
      <h4>{"ujjval"}</h4>
      <h6>@{"ujjval"}</h6>
      <button onClick={()=> logout()}>
        Logout</button>

      <Routes>
    {/*      <Route path="/mytuits"
               element={<MyTuits/>}/>
      <Route path="/tuits-and-replies"
               element={<TuitsAndReplies/>}/> 
        <Route path="/media"
               element={<Media/>}/> */}
        <Route path="profile/mylikes"
               element={<MyLikes/>}/>
      </Routes>

    </div>
  );
};
export default Profile;