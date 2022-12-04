import React, {useState, useEffect} from "react";
import LikeService from '../../services/likes-service';
import DislikeService from '../../services/dislikes-service';
import {useParams} from "react-router-dom";

const TuitStats = ({tuit }) => {

  const {userId} = useParams();
  const [isTuitLiked, setIsTuitLiked] = useState(false);
  const [isTuitDisliked, setIsTuitDisliked] = useState(false);
  const [countOfUsersWhoLikeTheTuit, setCountOfUsersWhoLikeTheTuit] = useState(0);
  const [countOfUsersWhoDislikeTheTuit, setCountOfUsersWhoDislikeTheTuit] = useState(0);

 const likeTuit = async () => {
if(!isTuitLiked){
  setIsTuitLiked(true);
  setIsTuitDisliked(false);
  setCountOfUsersWhoLikeTheTuit((count)=>count+1);
  if(countOfUsersWhoDislikeTheTuit>0){
    DislikeService.deleteDislike(userId,tuit._id); 
  setCountOfUsersWhoDislikeTheTuit((count)=>count-1);
  }
 LikeService.createLike(userId,tuit._id);

}
 }

 const dislikeTuit = async () => {
  if(!isTuitDisliked){
    setIsTuitDisliked(true);
    setIsTuitLiked(false);
    if(countOfUsersWhoLikeTheTuit>0){
    setCountOfUsersWhoLikeTheTuit((count)=>count-1);
    LikeService.deleteLike(userId,tuit._id);
    }
     DislikeService.createDislike(userId,tuit._id);
    setCountOfUsersWhoDislikeTheTuit((count)=>count+1);
  }
   }

 useEffect(() => {

  // get initial count of likes and dislikes for the tuit
  LikeService.findUsersThatLikedATuid(tuit._id).then((data)=>{
    setCountOfUsersWhoLikeTheTuit(data.length);
    
    data.forEach(tuit => {
      const userThatLikedTheTuit= tuit.likedBy;
      if(userThatLikedTheTuit._id === userId){
       setIsTuitLiked(true);
        setIsTuitDisliked(false);
      }
  });

  });

  DislikeService.findUsersThatDislikedATuid(tuit._id).then((data)=>{
    setCountOfUsersWhoDislikeTheTuit(data.length);
    
    data.forEach(tuit => {
      const userThatLikedTheTuit= tuit.dislikedBy;
      if(userThatLikedTheTuit._id === userId){
        setIsTuitLiked(false);
        setIsTuitDisliked(true);
      }

});

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