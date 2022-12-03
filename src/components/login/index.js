/*import React , { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { deleteUsersByUsername, findUserByCredentials, createUser} from '../../services/users-service';

function Login () {

    const navigate = useNavigate();
    const [usernames, setUsernames] = useState(['nasa', 'spacex', 'alice', 'bob', 'charlie']);
    const [registerUserInformation, setRegisterUserInformation]= useState({
        'username' : null,
        'password' : null,
        'email' : null
    });

    const [loginUserInformation, setLoginUserInformation]= useState({
        'username' : null,
        'password' : null
    });

  // const usernames = ['NASA', 'SPACEX', 'alice', 'bob', 'charlie'];
   const deleteUser = (username) => {
       // deleteUsersByUsername(username); //delete from database
        let index=usernames.indexOf(username);
        console.log('deleted index: '+index);
        if (index > -1) { 
            let tempUsernames=usernames;
            tempUsernames.splice(index, 1); 
            setUsernames([...tempUsernames]);
          }
          console.log('usernames: '+usernames);

      }

      const registerAUser = () => {

      //  createUser(registerUserInformation);
  alert('User is registered! Please login'+JSON.stringify(registerUserInformation));
        }

        const loginAUser = () => {

        //    const user = findUserByCredentials(loginUserInformation)
            const user = '123';
            //login a user using Rest Api
            if(user!=null){
            navigate('../user/123/tuiter'); 
            }else {
              alert('Incorrect credentials!');
            }

          }

        

    useEffect(() => {

       // const allUsers=  findAllUsers();
       const allUsers= [{username :'NASA'}, {username: 'SPACEX'} , {username: 'alice'}]
          const Allusernames = allUsers.map(function(user){
         return user.username;
        });
console.log('Allusernames'+JSON.stringify(Allusernames));
        let filteredUsernames = usernames.filter(function(username){

            return Allusernames.includes(username)
           })
           console.log('filteredUsernames'+JSON.stringify(filteredUsernames));
       setUsernames(filteredUsernames)
console.log('user effects called');

    },[])

  return(
      <>
      <br />
    <div>
        <h1>Register</h1>
        <form>
  <div className="form-group">
    <input type="text" className="form-control" id="register-username" aria-describedby="emailHelp" placeholder="Enter username" 
    onChangeCapture={(e)=>console.log(setRegisterUserInformation({...registerUserInformation, 'username' :e.target.value }))}/>
  </div>
  <div className="form-group">
    <input type="password" className="form-control" id="register-password" placeholder="Enter Password" 
    onChangeCapture={(e)=>console.log(setRegisterUserInformation({...registerUserInformation, 'password' :e.target.value }))}/>
  </div>
  <div className="form-group">
    <input type="email" className="form-control" id="register-email" aria-describedby="emailHelp" placeholder="Enter email" 
    onChangeCapture={(e)=>console.log(setRegisterUserInformation({...registerUserInformation, 'email' :e.target.value }))}/>
  </div>
  <br />
  <button type="submit" className="btn btn-primary" onClick={() => registerAUser()} >Register</button>
</form>
    </div>
    <br />
    <div>
        <h1>Login</h1>
        <form>
  <div className="form-group">
    <input type="text" className="form-control" id="register-username" aria-describedby="emailHelp" placeholder="Enter username"
    onChangeCapture={(e)=>console.log(setLoginUserInformation({...loginUserInformation, 'username' :e.target.value }))} />
  </div>
  <div className="form-group">
    <input type="password" className="form-control" id="register-password" placeholder="Enter Password" 
    onChangeCapture={(e)=>console.log(setLoginUserInformation({...loginUserInformation, 'password' :e.target.value }))}/>
  </div>
  <br />
  <button type="submit" className="btn btn-primary" onClick={() => loginAUser()}>Login</button>
</form>
    </div>
    <div>
    <ul className="list-group">
        <h1> Login As</h1>
  {usernames.map((username,index) => {
              return(
                <li key={'login-as-'+username+'index-'+index} className="list-group-item">{username}<i style={{float: "right",color: "red"}} onClick={() => deleteUser(username)} className="fa-sharp fa-solid fa-square-xmark fa-2x"></i></li>
              )
            })}
</ul>
</div>
    </>
  );
}
*/

import React , { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { deleteUsersByUsername, findUsersByUsername, signup, login} from '../../services/users-service';
import UserService from '../../services/user-service';
function Login () {

  const navigate = useNavigate();
  const [usernames, setUsernames] = useState(['nasa', 'spacex', 'alice', 'bob', 'charlie']);
  const [registerUserInformation, setRegisterUserInformation]= useState({
      'username' : null,
      'password' : null,
      'email' : null
  });

  const [loginUserInformation, setLoginUserInformation]= useState({
      'username' : null,
      'password' : null
  });

  const deleteUser = (username) => {

    UserService.deleteUsersByUsername(username);
     let index=usernames.indexOf(username);
     console.log('deleted index: '+index);
     if (index > -1) { 
         let tempUsernames=usernames;
         tempUsernames.splice(index, 1); 
         setUsernames([...tempUsernames]);
       }
       console.log('usernames: '+usernames);

   }

   const registerAUser = () => {

    //  createUser(registerUserInformation);
   const user = UserService
   .signup(registerUserInformation)
   .then((user)=>alert('User registered'))
   .catch((err)=>alert('Enter a unique username'));
/*
   if(user){
     alert('User is registered');
   } else {
     alert('Incorrect details');
   */
      }

      const loginAUser = () => {
        const user= UserService
        .login(loginUserInformation)
        .then((user)=>navigate('../user/'+user._id+'/tuiter'))
        .catch((err)=>alert('Incorrect credentials!'));
  
        }

 

        useEffect(() => {
          
          const tempUsernames =[];
          usernames.forEach(function(username){
           
            const user=  UserService
            .findUsersByUsername(username)
            .then((user)=>{

             //tempUsernames.append(username);
             tempUsernames.push(username)
            });
  
           });
           setUsernames(tempUsernames)

       },[JSON.stringify(usernames)]);


  return(
      <>
      <br />
    <div>
        <h1>Register</h1>
        <form>
  <div className="form-group">
    <input type="text" className="form-control" id="register-username" aria-describedby="emailHelp" placeholder="Enter username" 
    onChangeCapture={(e)=>console.log(setRegisterUserInformation({...registerUserInformation, 'username' :e.target.value }))}/>
  </div>
  <div className="form-group">
    <input type="password" className="form-control" id="register-password" placeholder="Enter Password" 
    onChangeCapture={(e)=>console.log(setRegisterUserInformation({...registerUserInformation, 'password' :e.target.value }))}/>
  </div>
  <div className="form-group">
    <input type="email" className="form-control" id="register-email" aria-describedby="emailHelp" placeholder="Enter email" 
    onChangeCapture={(e)=>console.log(setRegisterUserInformation({...registerUserInformation, 'email' :e.target.value }))}/>
  </div>
  <br />
  <button type="button" className="btn btn-primary" onClick={() => registerAUser()} >Register</button>
</form>
    </div>
    <br />
    <div>
        <h1>Login</h1>
        <form>
  <div className="form-group">
    <input type="text" className="form-control" id="register-username" aria-describedby="emailHelp" placeholder="Enter username"
    onChangeCapture={(e)=>console.log(setLoginUserInformation({...loginUserInformation, 'username' :e.target.value }))} />
  </div>
  <div className="form-group">
    <input type="password" className="form-control" id="register-password" placeholder="Enter Password" 
    onChangeCapture={(e)=>console.log(setLoginUserInformation({...loginUserInformation, 'password' :e.target.value }))}/>
  </div>
  <br />
  <button type="button" className="btn btn-primary" onClick={() => loginAUser()}>Login</button>
</form>
    </div>
    <div>
    <ul className="list-group">
        <h1> Login As</h1>
  {usernames.map((username,index) => {
              return(
                <li key={'login-as-'+username+'index-'+index} className="list-group-item">{username}<i style={{float: "right",color: "red"}} onClick={() => deleteUser(username)} className="fa-sharp fa-solid fa-square-xmark fa-2x"></i></li>
              )
            })}
</ul>
</div>
    </>
  );
}
export default Login;