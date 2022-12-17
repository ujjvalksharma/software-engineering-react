import LikeService from "../services/likes-service";
import UserService from "../services/user-service";
import TuitService from "../services/tuits-service";

describe('Create like', () => {


  test('Create like', async () => {
 
    const user1= await UserService.createUser({'username': 'ujj', 'password':'ujj'});
   let uid=user1._id;
   let tuit= await TuitService.createTuit(uid, {'tuit' :'new tuit '});
   const tid=tuit._id;
    const createLike = await LikeService.createLike(uid,tid);
    expect(uid).toEqual(createLike.likedBy);   
    expect(tid).toEqual(createLike.likedTuit);
    const deletedLike = await LikeService.deleteLike(uid,tid);
    await UserService.deleteUsersByUsername('ujj');
    await TuitService.deleteTuit(tid);
  });
});

describe('Delete like', () => {


  test('Delete like', async () => {
    const user1= await UserService.createUser({'username': 'ujj', 'password':'ujj'});
   let uid=user1._id;
   let tuit= await TuitService.createTuit(uid, {'tuit' :'new tuit '});
   const tid=tuit._id;
     const createLike = await LikeService.createLike(uid,tid);
     expect(uid).toEqual(createLike.likedBy);   
     expect(tid).toEqual(createLike.likedTuit);
     const deletedLike = await LikeService.deleteLike(uid,tid);
     expect(deletedLike.deletedCount).toEqual(1);
     await UserService.deleteUsersByUsername('ujj');
    await TuitService.deleteTuit(tid);
  });
});

describe('Increment Like Count after like button click',  () => {


  test('Increment Like Count after like button click', async () => {

    const user1= await UserService.createUser({'username': 'ujj', 'password':'ujj'});
   let uid=user1._id;
   let tuit= await TuitService.createTuit(uid, {'tuit' :'new tuit '});
   const tid=tuit._id;
    const prevLikeTuits= await LikeService.findUsersThatLikedATuid(tid);
    const prevCount= prevLikeTuits.length;
    const user2= await UserService.createUser({'username': 'ujj1', 'password':'ujj1'});
    let newUid=user2._id;
    const createLike = await LikeService.createLike(newUid,tid);
    const newLikeTuits= await LikeService.findUsersThatLikedATuid(tid);
    const newLikeCount=newLikeTuits.length;
    expect(newLikeCount>0).toEqual(true); 
    const deletedLike = await LikeService.deleteLike(uid,tid);
    await UserService.deleteUsersByUsername('ujj');
    await TuitService.deleteTuit(tid);
    await UserService.deleteUsersByUsername('ujj1');

  });
});


describe('Decrement Like Count after like button unclick',  () => {

  test('Decrement Like Count after like button unclick', async () => {

   const user1= await UserService.createUser({'username': 'ujj', 'password':'ujj'});
   let uid=user1._id;
   let tuit= await TuitService.createTuit(uid, {'tuit' :'new tuit '});
   const tid=tuit._id;
   const createLike = await LikeService.createLike(uid,tid);
   const prevLikeTuits= await LikeService.findUsersThatLikedATuid(tid);
   const prevCount=prevLikeTuits.length;
   const deletedLike = await LikeService.deleteLike(uid,tid);
   const newLikeTuits= await LikeService.findUsersThatLikedATuid(tid);
   const newLikeCount=newLikeTuits.length;
    expect(newLikeCount<prevCount).toEqual(true); 
   await UserService.deleteUsersByUsername('ujj');
   await TuitService.deleteTuit(tid);

   

  });


});
