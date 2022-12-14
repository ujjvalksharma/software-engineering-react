import React from "react";
import Navigation from "../navigation";
import WhatsHappening from "../whats-happening";
import {Routes, Route, HashRouter} from "react-router-dom";
import Home from "../home";
import Bookmarks from "../bookmarks";
import Profile from "../profile";
import './tuiter.css'
import Explore from "../explore";
import Notifications from "../notifications";
import Messages from "../messages";
import Lists from "../lists";
import More from "../more";
import Login from "../login";
import FallBackHome from "../FallBackHome";
import MyLikes from "../profile/my-likes";
import MyTuits from "../profile/my-tuits"; 
import MyDislikes from "../profile/my-dislikes"; 

function Tuiter () {
  return(
    <HashRouter>
      <div className="container">
        <div className="ttr-tuiter">
          <div className="ttr-left-column">
            <Navigation/>
          </div>
          <div className="ttr-center-column">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/user/:userId/tuiter/" element={<Home/>}/>
              <Route path="/tuiter" element={<Home/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/explore" element={<Explore/>}/>
              <Route path="/notifications" element={<Notifications/>}/>
              <Route path="/messages" element={<Messages/>}/>
              <Route path="/bookmarks" element={<Bookmarks/>}/>
              <Route path="/lists" element={<Lists/>}/>
              <Route path="/profile" element={<MyTuits/>}/>
              <Route path="/more" element={<More/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/profile/mylikes" element={<MyLikes/>}/>
              <Route path="/profile/mytuits" element={<MyTuits/>}/>
              <Route path="/profile/mydislike" element={<MyDislikes/>}/>  
            </Routes>
          </div>
          <div className="ttr-right-column">
            <WhatsHappening/>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}
export default Tuiter;