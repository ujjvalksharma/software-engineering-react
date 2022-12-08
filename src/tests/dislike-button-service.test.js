import DisLikeService from "../services/dislikes-service";

describe('Create Dislike', () => {


  test('Create Dislike', async () => {
 
   const uid= '6359de6091bbeb778a1bd617'
   const tid='6354bb867c06cb205a0e0caa';
    const createDislike = await DisLikeService.createDislike(uid,tid);
    expect(uid).toEqual(createDislike.dislikedBy);   
    expect(tid).toEqual(createDislike.dislikedTuit);
    const deletedDislike = await DisLikeService.deleteDislike(uid,tid);
  });
});

describe('Delete Dislike', () => {


  test('Delete Dislike', async () => {
  
     const uid= '6359de6091bbeb778a1bd617'
     const tid='6354bb867c06cb205a0e0caa';
     const createDislike = await DisLikeService.createDislike(uid,tid);
     expect(uid).toEqual(createDislike.dislikedBy);   
     expect(tid).toEqual(createDislike.dislikedTuit);
     const deletedDislike = await DisLikeService.deleteDislike(uid,tid);
     expect(deletedDislike.deletedCount).toEqual(1);
  });
});

describe('Increment Dislike Count after like button click',  () => {


  test('Increment Dislike Count after like button click', async () => {

    const uid= '6359de6091bbeb778a1bd617'
    const tid='6354bb867c06cb205a0e0caa';
    const prevLikeTuits= await DisLikeService.findUsersThatDislikedATuid(tid);
    const prevCount= prevLikeTuits.length;
    const newUid='638a95362e47b14a0a16825b';
    const createLike = await DisLikeService.createDislike(newUid,tid);
    const newLikeTuits= await DisLikeService.findUsersThatDislikedATuid(tid);
    const newLikeCount=newLikeTuits.length;
    expect(newLikeCount>0).toEqual(true); 
    const deletedLike = await DisLikeService.deleteDislike(uid,tid);


  });
});


describe('Decrement Like Count after like button unclick',  () => {

  test('Decrement Like Count after like button unclick', async () => {

   const uid= '6359de6091bbeb778a1bd617'
   const tid='6354bb867c06cb205a0e0caa';
   const createLike = await DisLikeService.createDislike(uid,tid);
   const prevLikeTuits= await DisLikeService.findUsersThatDislikedATuid(tid);
   const prevCount=prevLikeTuits.length;
   const deletedLike = await DisLikeService.deleteDislike(uid,tid);
   const newLikeTuits= await DisLikeService.findUsersThatDislikedATuid(tid);
   const newLikeCount=newLikeTuits.length;
    expect(newLikeCount<prevCount).toEqual(true); 

  });


});
