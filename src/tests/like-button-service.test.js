import LikeService from "../services/likes-service";

describe('Create like', () => {


  test('Create like', async () => {
 
   const uid= '6359de6091bbeb778a1bd617'
   const tid='6354bb867c06cb205a0e0caa';
    const createLike = await LikeService.createLike(uid,tid);
    expect(uid).toEqual(createLike.likedBy);   
    expect(tid).toEqual(createLike.likedTuit);
    const deletedLike = await LikeService.deleteLike(uid,tid);
  });
});

describe('Delete like', () => {


  test('Delete like', async () => {
  
     const uid= '6359de6091bbeb778a1bd617'
     const tid='6354bb867c06cb205a0e0caa';
     const createLike = await LikeService.createLike(uid,tid);
     expect(uid).toEqual(createLike.likedBy);   
     expect(tid).toEqual(createLike.likedTuit);
     const deletedLike = await LikeService.deleteLike(uid,tid);
     expect(deletedLike.deletedCount).toEqual(1);
  });
});

describe('Increment Like Count after like button click',  () => {


  test('Increment Like Count after like button click', async () => {

    const uid= '6359de6091bbeb778a1bd617'
    const tid='6354bb867c06cb205a0e0caa';
    const prevLikeTuits= await LikeService.findUsersThatLikedATuid(tid);
    const prevCount= prevLikeTuits.length;
    const newUid='638a95362e47b14a0a16825b';
    const createLike = await LikeService.createLike(newUid,tid);
    const newLikeTuits= await LikeService.findUsersThatLikedATuid(tid);
    const newLikeCount=newLikeTuits.length;
    expect(newLikeCount>0).toEqual(true); 
    const deletedLike = await LikeService.deleteLike(uid,tid);


  });
});


describe('Decrement Like Count after like button unclick',  () => {

  test('Decrement Like Count after like button unclick', async () => {


    /* const uid= '6359de6091bbeb778a1bd617'
    const tid='6354bb867c06cb205a0e0caa';
   const prevLikeTuits= await LikeService.findUsersThatLikedATuid(tid);
    const prevCount= prevLikeTuits.length;
    const newUid='638a95362e47b14a0a16825b';
    const createLike = await LikeService.createLike(newUid,tid);
    const newLikeTuits= await LikeService.findUsersThatLikedATuid(tid);
    const newLikeCount=newLikeTuits.length;
    expect(newLikeCount).toEqual(prevCount+1);   
    const deletedLike = await LikeService.deleteLike(uid,tid);
    */

   const uid= '6359de6091bbeb778a1bd617'
   const tid='6354bb867c06cb205a0e0caa';
   const createLike = await LikeService.createLike(uid,tid);
   const prevLikeTuits= await LikeService.findUsersThatLikedATuid(tid);
   const prevCount=prevLikeTuits.length;
   const deletedLike = await LikeService.deleteLike(uid,tid);
   const newLikeTuits= await LikeService.findUsersThatLikedATuid(tid);
   const newLikeCount=newLikeTuits.length;
    expect(newLikeCount<prevCount).toEqual(true); 

  });


});
