import DisLikeService from "../services/dislikes-service";
import UserService from '../services/user-service';
import TuitService from "../services/tuits-service";

describe('Create Dislike', () => {


  test('Create Dislike', async () => {
 
    const user1= await UserService.createUser({'username': 'ujj', 'password':'ujj'});
    let uid=user1._id;
    let tuit= await TuitService.createTuit(uid, {'tuit' :'new tuit '});
    const tid=tuit._id;
    const createDislike = await DisLikeService.createDislike(uid,tid);
    expect(uid).toEqual(createDislike.dislikedBy);   
    expect(tid).toEqual(createDislike.dislikedTuit);
    const deletedDislike = await DisLikeService.deleteDislike(uid,tid);
    await UserService.deleteUsersByUsername('ujj');
     await TuitService.deleteTuit(tid);
  });
});

describe('Delete Dislike', () => {


  test('Delete Dislike', async () => {
  
    const user1= await UserService.createUser({'username': 'ujj', 'password':'ujj'});
    let uid=user1._id;
    let tuit= await TuitService.createTuit(uid, {'tuit' :'new tuit '});
    const tid=tuit._id;
     const createDislike = await DisLikeService.createDislike(uid,tid);
     expect(uid).toEqual(createDislike.dislikedBy);   
     expect(tid).toEqual(createDislike.dislikedTuit);
     const deletedDislike = await DisLikeService.deleteDislike(uid,tid);
     expect(deletedDislike.deletedCount).toEqual(1);
     await UserService.deleteUsersByUsername('ujj');
     await TuitService.deleteTuit(tid);
  });
});

describe('Increment Dislike Count after like button click',  () => {


  test('Increment Dislike Count after like button click', async () => {

    const user1= await UserService.createUser({'username': 'ujj', 'password':'ujj'});
    let uid=user1._id;
    let tuit= await TuitService.createTuit(uid, {'tuit' :'new tuit '});
    const tid=tuit._id;
    const prevLikeTuits= await DisLikeService.findUsersThatDislikedATuid(tid);
    const prevCount= prevLikeTuits.length;
    const user2= await UserService.createUser({'username': 'ujj1', 'password':'ujj1'});
    let newUid=user2._id;
    const createLike = await DisLikeService.createDislike(newUid,tid);
    const newLikeTuits= await DisLikeService.findUsersThatDislikedATuid(tid);
    const newLikeCount=newLikeTuits.length;
    expect(newLikeCount>0).toEqual(true); 
    const deletedLike = await DisLikeService.deleteDislike(uid,tid);

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
   const createLike = await DisLikeService.createDislike(uid,tid);
   const prevLikeTuits= await DisLikeService.findUsersThatDislikedATuid(tid);
   const prevCount=prevLikeTuits.length;
   const deletedLike = await DisLikeService.deleteDislike(uid,tid);
   const newLikeTuits= await DisLikeService.findUsersThatDislikedATuid(tid);
   const newLikeCount=newLikeTuits.length;
    expect(newLikeCount<prevCount).toEqual(true); 
    await UserService.deleteUsersByUsername('ujj');
    await TuitService.deleteTuit(tid);

  });


});
