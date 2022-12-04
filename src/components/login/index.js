

import React , { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from '../../services/user-service';
function Login () {

  const navigate = useNavigate();
  const [usernames, setUsernames] = useState([]);
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
   //  console.log('deleted index: '+index);
     if (index > -1) { 
         let tempUsernames=usernames;
         tempUsernames.splice(index, 1); 
         setUsernames([...tempUsernames]);
       }
      // console.log('usernames: '+usernames);

   }

   const registerAUser = () => {
   const user = UserService
   .signup(registerUserInformation)
   .then((user)=>alert('User registered'))
   .catch((err)=>alert('Enter a unique username'));

      }

      

      const loginWithoutUsername = (username) => {
       

        UserService
        .findUsersByUsername(username)
        .then((user)=>{
        if(user!=null){
        //  console.log('current selected user: '+JSON.stringify(user));
          UserService.login(user)
          .then((user)=>navigate('../user/'+user._id+'/tuiter'))
          .catch((err)=>alert('Default user is not available'));

        }
        });
     
           }

      const loginAUser = () => {
        const user= UserService
        .login(loginUserInformation)
        .then((user)=>navigate('../user/'+user._id+'/tuiter'))
        .catch((err)=>alert('Incorrect credentials!'));
  
        }

        useEffect(()=>{

         // console.log('I am here');
          const tempUsernames=['nasa', 'spacex', 'alice', 'bob', 'charlie'];

          tempUsernames.forEach(function(username){

            UserService
            .findUsersByUsername(username)
            .then((user)=>{
            if(user!=null){
           //  console.log('user: '+JSON.stringify(user));
            setUsernames(usernames1 => [...usernames1, username]);
            }
            });

          });

        },[]);
 

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
                <li onClick={()=>loginWithoutUsername(username)} key={'login-as-'+username+'index-'+index} className="list-group-item">{username}<i style={{float: "right",color: "red"}} onClick={() => deleteUser(username)} className="fa-sharp fa-solid fa-square-xmark fa-2x"></i></li>
              )
            })}
</ul>
</div>
    </>
  );
}
export default Login;