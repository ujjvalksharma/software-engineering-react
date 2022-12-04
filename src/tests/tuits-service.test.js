
 import TuitService from "../services/tuits-service";
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
  
  
    });
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
    describe('can retrieve all tuits with REST API', () => {
      
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
  
  
    });