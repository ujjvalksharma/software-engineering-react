
/*import TuitService from "../services/tuits-service";
 import UserService from "../services/user-service";
  describe('can create tuit wtih REST API', () => {
  
    let oldTuit = {
      tuit: "Hi! This is my new tuit",
      postedBy: "123",
    };
  
    beforeAll(() => {
      TuitService.deleteAllTuitsByUser("123"); //create deleteAllTuitOfAUser function
    });
  
    test("create new tuit with REST API", async () => {
    //  const newTuit = await TuitService.createTuit("123", {tuit: "Hi! This is my new tuit"});
     const newTuit = oldTuit;
      expect(newTuit.tuit).toEqual(oldTuit.tuit);
      expect(newTuit.postedBy).toEqual(oldTuit.postedBy);
    });
  
    afterAll(() => {
      TuitService.deleteAllTuitsByUser("123");
    });
  
  
    }); */
    /*
    describe('can delete tuit wtih REST API', () => {
      
  
      let oldTuit = {
        tuit: "Hi! This is my new tuit",
        postedBy: "123",
      };
    
      beforeAll(async () => {
      //  oldTuit = await TuitService.createTuit("123", {tuit: "Hi! This is my new tuit"});
      });
    
      test("delete new tuit with REST API", async () => {
        const tuit1= await TuitService.createTuit("123", {tuit: "Hi! This is my new tuit"});
        let status = await TuitService.deleteTuit(tuit1._id);
        expect(1).toBeGreaterThanOrEqual(1); // to be changed
      });
    
      afterAll(() => {
        TuitService.deleteTuit(oldTuit._id);
      });
  
  
    });
    */
   /*
    describe('can retrieve a tuit by their primary key with REST API', () => {
      let oldTuit = {
        tuit: "Hi! This is my new tuit",
        postedBy: "123",
      };
    
      beforeAll( () => {
       // oldTuit = await TuitService.createTuit("123", {tuit: "Hi! This is my new tuit"});
      });
    
      test("delete new tuit with REST API", async () => {
        oldTuit = await TuitService.createTuit("123", {tuit: "Hi! This is my new tuit"});
       // let retrivedTuit = await TuitService.findTuitById(oldTuit._id);
       let retrivedTuit=oldTuit;
        expect(retrivedTuit.tuit).toEqual(oldTuit.tuit);
        expect(retrivedTuit.postedBy).toEqual(oldTuit.postedBy);
      });
    
      afterAll(() => {
        TuitService.deleteTuit(oldTuit._id);
      });
    });
    */
    /*describe('can retrieve all tuits with REST API', () => {
      
      const tuits = [
  
        {
          tuit: "Tuit 1",
          postedBy: "100",
        },
        {
          tuit: "Tuit 2",
          postedBy: "101",
        },
        {
          tuit: "Tuit 3",
          postedBy: "100",
        }
      ];
    
  
      beforeAll(() =>
  
        tuits.map((tuit,index) =>
        tuits[index]=TuitService.createTuit(tuit.postedBy,{"tuit":tuit.tuit} )
        )
      );
    
  
      afterAll(() =>
  
        tuits.map(tuit =>
          TuitService.deleteTuit(tuit._id)
        )
      );
    
      test('Retrieve all users from REST API', async () => {
        // retrieve all the users
        const tuitsFromApi = await TuitService.findAllTuits();
    
        // there should be a minimum number of users
        expect(tuitsFromApi.length).toBeGreaterThanOrEqual(tuits.length);
    
        // let's check each user we inserted
        const tuitWeInserted = tuitsFromApi.filter(
          tuit => tuits.indexOf(tuit._id) >= 0);
    
        // compare the actual users in database with the ones we sent
        tuitWeInserted.forEach(tuit => {
          const sameTuit = tuits.find(oldTuit => oldTuit._id === tuit._id);
          expect(sameTuit.tuit).toEqual(tuit.tuit);
          expect(sameTuit.postedBy).toEqual(tuit.postedBy);
        });
      });
  
  
    });*/


    import TuitService from "../services/tuits-service";

    describe('can create tuit with REST API', () => {
      // TODO: implement this

      let oldTuit = {
        tuit: "Hi! This is my new tuit"
      };
      let userId='638f5daf5561b563b87b7577';

      test('can create tuit with REST API', async () => {

      //  const createTuit = async () =>{

          const createdTuit= await TuitService.createTuit(userId,oldTuit);
        //  console.log('createdTuit: '+JSON.stringify(createdTuit));
          expect(createdTuit.tuit).toEqual(oldTuit.tuit);
          expect(createdTuit.postedBy).toEqual(userId);
          const deletedTuit= await TuitService.deleteTuit(createdTuit._id);
          expect(deletedTuit.data.deletedCount).toEqual(1);
     //   };

       // createTuit();
      });


    });
    
    describe('can delete tuit wtih REST API', () => {
      let oldTuit = {
        tuit: "Hi! This is my new tuit"
      };
      let userId='638f5daf5561b563b87b7577';

      test('can create tuit with REST API', async () => {



          const createdTuit= await TuitService.createTuit(userId,oldTuit);
        //  console.log('createdTuit: '+JSON.stringify(createdTuit));
          expect(createdTuit.tuit).toEqual(oldTuit.tuit);
          expect(createdTuit.postedBy).toEqual(userId);
         const deletedTuit= await TuitService.deleteTuit(createdTuit._id);
         expect(deletedTuit.data.deletedCount).toEqual(1);

      });

    });
    
    describe('can retrieve a tuit by their primary key with REST API', () => {
      
      let oldTuit = {
        tuit: "Hi! This is my new tuit"
      };
      let userId='638f5daf5561b563b87b7577';

      test('can create tuit with REST API', async () => {

          const createdTuit= await TuitService.createTuit(userId,oldTuit);
          expect(createdTuit.tuit).toEqual(oldTuit.tuit);
          expect(createdTuit.postedBy).toEqual(userId);
         const lookedUpTuitById= await TuitService.findTuitById(createdTuit._id)
         expect(createdTuit.tuit).toEqual(lookedUpTuitById.tuit);
          expect(lookedUpTuitById.postedBy).toEqual(userId);
          const deletedTuit= await TuitService.deleteTuit(createdTuit._id);
         expect(deletedTuit.data.deletedCount).toEqual(1);

      });


    });
    
    describe('can retrieve all tuits with REST API', () => {
      
      test('can create tuit with REST API', async () => {

        const allTuits= await TuitService.findAllTuits();
        expect(allTuits.length>0).toEqual(true);

    });

    });
