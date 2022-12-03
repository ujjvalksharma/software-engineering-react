
 import TuitService from "../services/tuits-service";
  describe('can create tuit wtih REST API', () => {
  
    let oldTuit = {
      tuit: "Hi! This is my new tuit",
      postedBy: "123",
    };
  
    beforeAll(() => {
      deleteAllTuitOfAUser("123"); //create deleteAllTuitOfAUser function
    });
  
    test("create new tuit with REST API", async () => {
      const newTuit = await TuitService.createTuit(oldTuit);
      expect(newTuit.tuit).toEqual(oldTuit.tuit);
      expect(newTuit.postedBy).toEqual(oldTuit.postedBy);
    });
  
    afterAll(() => {
      deleteAllTuitOfAUser("123");
    });
  
  
    });
    
    describe('can delete tuit wtih REST API', () => {
      
  
      let oldTuit = {
        tuit: "Hi! This is my new tuit",
        postedBy: "123",
      };
    
      beforeAll(() => {
        oldTuit = await TuitService.createTuit(oldTuit);
      });
    
      test("delete new tuit with REST API", async () => {
        let status = TuitService.deleteTuit(newTuit._id);
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
      });
    
      afterAll(() => {
        TuitService.deleteTuit(oldTuit._id);
      });
  
  
    });
    
    describe('can retrieve a tuit by their primary key with REST API', () => {
      let oldTuit = {
        tuit: "Hi! This is my new tuit",
        postedBy: "123",
      };
    
      beforeAll(() => {
         oldTuit = await TuitService.createTuit(oldTuit);
      });
    
      test("delete new tuit with REST API", async () => {
        
        let retrivedTuit = TuitService.findTuitById(oldTuit._id);
        expect(retrivedTuit.tuit).toEqual(oldTuit.tuit);
        expect(retrivedTuit.postedBy).toEqual(oldTuit.postedBy);
      });
    
      afterAll(() => {
        TuitService.deleteTuit(oldTuit._id);
      });
    });
    
    describe('can retrieve all tuits with REST API', () => {
      
      const tuits = [
  
        {
          tuit: "Tuit 1",
          postedBy: "tuit1@gmail.com",
        },
        {
          tuit: "Tuit 2",
          postedBy: "tuit2@gmail.com",
        },
        {
          tuit: "Tuit 3",
          postedBy: "tuit3@gmail.com",
        }
      ];
    
  
      beforeAll(() =>
  
        tuits.map((tuit,index) =>
        tuits[index]=createUser(tuit)
        )
      );
    
  
      afterAll(() =>
  
        tuits.map(tuit =>
          TuitService.deleteTuit(tuit._id)
        )
      );
    
      test('Retrieve all users from REST API', async () => {
        // retrieve all the users
        const tuitsFromApi = await findAllUsers();
    
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