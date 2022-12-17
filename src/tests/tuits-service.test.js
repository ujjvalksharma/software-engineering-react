    import UserService from '../services/user-service';
    import TuitService from "../services/tuits-service";

    describe('can create tuit with REST API', () => {
      // TODO: implement this

      let oldTuit = {
        tuit: "Hi! This is my new tuit"
      };

      test('can create tuit with REST API', async () => {

    
        const user1= await UserService.createUser({'username': 'ujj', 'password':'ujj'});
        let userId=user1._id;

          const createdTuit= await TuitService.createTuit(userId,oldTuit);
        //  console.log('createdTuit: '+JSON.stringify(createdTuit));
          expect(createdTuit.tuit).toEqual(oldTuit.tuit);
          expect(createdTuit.postedBy).toEqual(userId);
          const deletedTuit= await TuitService.deleteTuit(createdTuit._id);
          const deletedUser = await UserService.deleteUsersByUsername('ujj');
          expect(deletedTuit.data.deletedCount).toEqual(1);
     //   };

       // createTuit();
      });


    });
    
    describe('can delete tuit wtih REST API',  () => {
      let oldTuit = {
        tuit: "Hi! This is my new tuit"
      };

      test('can create tuit with REST API', async () => {

        const user1= await UserService.createUser({'username': 'ujj', 'password':'ujj'});
        let userId=user1._id;


          const createdTuit= await TuitService.createTuit(userId,oldTuit);
        //  console.log('createdTuit: '+JSON.stringify(createdTuit));
          expect(createdTuit.tuit).toEqual(oldTuit.tuit);
          expect(createdTuit.postedBy).toEqual(userId);
         const deletedTuit= await TuitService.deleteTuit(createdTuit._id);
         const deletedUser = await UserService.deleteUsersByUsername('ujj');
         expect(deletedTuit.data.deletedCount).toEqual(1);

      });

    });
    
    describe('can retrieve a tuit by their primary key with REST API', () => {
      
      let oldTuit = {
        tuit: "Hi! This is my new tuit"
      };

      test('can create tuit with REST API', async () => {

        const user1= await UserService.createUser({'username': 'ujj', 'password':'ujj'});
        let userId=user1._id;
          const createdTuit= await TuitService.createTuit(userId,oldTuit);
          expect(createdTuit.tuit).toEqual(oldTuit.tuit);
          expect(createdTuit.postedBy).toEqual(userId);
         const lookedUpTuitById= await TuitService.findTuitById(createdTuit._id)
         expect(createdTuit.tuit).toEqual(lookedUpTuitById.tuit);
          expect(lookedUpTuitById.postedBy).toEqual(userId);
          const deletedTuit= await TuitService.deleteTuit(createdTuit._id);
          const deletedUser = await UserService.deleteUsersByUsername('ujj');
         expect(deletedTuit.data.deletedCount).toEqual(1);

      });


    });
    
    describe('can retrieve all tuits with REST API', () => {
      
      test('can create tuit with REST API', async () => {

        const allTuits= await TuitService.findAllTuits();
        expect(allTuits.length>0).toEqual(true);

    });

    });
