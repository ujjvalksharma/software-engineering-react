import React, {useState, useEffect} from "react";
import LikeService from '../../services/likes-service';
import DislikeService from '../../services/dislikes-service';
import {useParams} from "react-router-dom";

const TuitStats = ({tuit }) => {

  const userId = JSON.parse(localStorage.getItem('profile'))._id;
  const [isTuitLiked, setIsTuitLiked] = useState(false);
  const [isTuitDisliked, setIsTuitDisliked] = useState(false);
  const [countOfUsersWhoLikeTheTuit, setCountOfUsersWhoLikeTheTuit] = useState(0);
  const [countOfUsersWhoDislikeTheTuit, setCountOfUsersWhoDislikeTheTuit] = useState(0);

 const likeTuit =  () => {


if(!isTuitLiked){
  console.log('tuit is liked');
  setIsTuitLiked(true);
  if(isTuitDisliked){
    console.log('tuit disliked is deleted');
    setIsTuitDisliked(false);
    setCountOfUsersWhoDislikeTheTuit((count)=>count-1);
    DislikeService.deleteDislike(userId,tuit._id).then(data => console.log('data: '+JSON.stringify(data)));
  }
  setCountOfUsersWhoLikeTheTuit((count)=>count+1);
 LikeService.createLike(userId,tuit._id).then((data)=>console.log('after liked: '+JSON.stringify(data)));

}

 }

 const dislikeTuit = async () => {

 if(!isTuitDisliked){
  
   setIsTuitDisliked(true);
    if(isTuitLiked){
      setIsTuitLiked(false);
      setCountOfUsersWhoLikeTheTuit((count)=>count-1);
       LikeService.deleteLike(userId,tuit._id)
   .then(data => console.log('data: '+JSON.stringify(data)))
    }
    setCountOfUsersWhoDislikeTheTuit((count)=>count+1);
    DislikeService.createDislike(userId,tuit._id);

  }

   }

 useEffect(() => {

  console.log('use effect called');
  // get initial count of likes and dislikes for the tuit
  LikeService.findUsersThatLikedATuid(tuit._id).then((data)=>{
    if(data!=null){
    setCountOfUsersWhoLikeTheTuit(data.length);
    
    data.forEach(tuit => {
      const userThatLikedTheTuit= tuit.likedBy;
      if(userThatLikedTheTuit._id === userId){
       setIsTuitLiked(true);
      }
  });
}
  });

  DislikeService.findUsersThatDislikedATuid(tuit._id).then((data)=>{

    if(data!=null){
    setCountOfUsersWhoDislikeTheTuit(data.length);
   // console.log('disliked people: '+JSON.stringify(data));
    data.forEach(tuit => {
      const userThatLikedTheTuit= tuit.dislikedBy;
      if(userThatLikedTheTuit._id === userId){
        setIsTuitDisliked(true);
      }

     });
}
  });

 }, []);


    return (
      <>
      <p>{tuit._id}</p>
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message me-1"></i>
          {tuit.stats && tuit.stats.replies}
        </div>
        <div className="col">
          <i className="far fa-retweet me-1"></i>
          {tuit.stats && tuit.stats.retuits}
        </div>
        <div className="col">
          {isTuitLiked&&<i className="fas fa-thumbs-up me-1" style={{color: 'blue'}} onClick={() => likeTuit(tuit)} >{countOfUsersWhoLikeTheTuit}</i> }
          {!isTuitLiked&&<i className="fas fa-thumbs-up me-1"  onClick={() => likeTuit(tuit)} >{countOfUsersWhoLikeTheTuit}</i> }
        </div>
        <div className="col">
        {isTuitDisliked&&<i className="fas fa-thumbs-down me-1" style={{color: 'blue'}} onClick={() => dislikeTuit(tuit)} >{countOfUsersWhoDislikeTheTuit}</i> }
          {!isTuitDisliked&&<i className="fas fa-thumbs-down me-1"  onClick={() => dislikeTuit(tuit)} >{countOfUsersWhoDislikeTheTuit}</i> }
        </div>
        <div className="col">
          <i className="far fa-inbox-out"></i>
        </div>
      </div>
      </>
    );
}
export default TuitStats;