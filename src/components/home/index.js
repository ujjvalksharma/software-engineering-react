import React, {useEffect, useState} from "react";
import Tuits from "../tuits";
import {useParams} from "react-router-dom";
import TuitService from '../../services/tuits-service';
import UserService from '../../services/user-service';
const Home = () => {

  const {userId} = useParams();
  const [userEnteredtuit, setUserEnteredtuit] = useState({'text':null})
  const [tuitsArray, setTuitsArray] = useState([]);

  const addTuitForTheUser = () => {

const newTuit = {
  "tuit": userEnteredtuit.text,
};

   TuitService
   .createTuit(userId,newTuit)
   .then((tuit)=>{
    UserService
   .findUserById(tuit.postedBy)
   .then((user)=>{
    
    const newTuit = {
      "_id": tuit._id,
      "postedBy": {"username": user.username},
      "tuit": userEnteredtuit.text,
      "image": "",
      "youtube": null,
      "avatarLogo": "",
      "published": Date.now(),
      "imageOverlay": null,
      "stats": {
        "replies": 0,
        "retuits": 0,
        "likes": 0
      }
    };

    setTuitsArray([newTuit,...tuitsArray])

   })
 
   })
   .catch((err)=>console.log('error on creating tuit: '+JSON.stringify(err)));

  }

 useEffect(() => {

  const alreadyPresentTuits=TuitService.findTuitByUser(userId).then((tuits)=>{
    
    UserService
    .findUserById(userId) 
    .then((user)=>{
     
      let tempTuits= [];

      for(let i=0;i<tuits.length;i++){

     //   console.log('current tuit: '+JSON.stringify(tuits[i]));

        const newTuit = {
          "_id": tuits[i]._id,
          "postedBy": {"username": user.username},
          "tuit": tuits[i].tuit,
          "image": "",
          "youtube": null,
          "avatarLogo": "",
          "published": tuits[i].postedOn,
          "imageOverlay": null,
          "stats": {
            "replies": 0,
            "retuits": 0,
            "likes": 0
          }
          
      }
     // console.log('newTuit: '+JSON.stringify(newTuit));
      tempTuits.push(newTuit);
     
     };
 
   //  console.log('final tuits: '+JSON.stringify(tempTuits));
 
     setTuitsArray([...tempTuits,...tuitsArray]);
 
    })


  });



  }, [userId]);

  return(

    <div className="ttr-home">
      <div className="border border-bottom-0">
        <h4 className="fw-bold p-2">Home Screen</h4>
        <div className="d-flex">
          <div className="p-2">
            <img className="ttr-width-50px rounded-circle"
                 src="../images/nasa-logo.jpg"/>
          </div>
          <div className="p-2 w-100">
            <textarea
              placeholder="What's happening?"
              className="w-100 border-0" 
              onChangeCapture={(e)=>    setUserEnteredtuit({...userEnteredtuit, 'text' :e.target.value })}></textarea>
            <div className="row">
              <div className="col-10 ttr-font-size-150pc text-primary">
                <i className="fas fa-portrait me-3"></i>
                <i className="far fa-gif me-3"></i>
                <i className="far fa-bar-chart me-3"></i>
                <i className="far fa-face-smile me-3"></i>
                <i className="far fa-calendar me-3"></i>
                <i className="far fa-map-location me-3"></i>
              </div>
              <div className="col-2">
                <a className={`btn btn-primary rounded-pill fa-pull-right
                                fw-bold ps-4 pe-4`} onClick={()=> addTuitForTheUser()}>
                  Tuit
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
       <Tuits tuits={tuitsArray}/> 
    </div>
  );
};
export default Home;