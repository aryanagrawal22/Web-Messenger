import { Button } from '@mui/material';
import React from 'react';
import { auth,provider } from './firebase';
import { signInWithPopup, GoogleAuthProvider, setPersistence, browserSessionPersistence, inMemoryPersistence } from "firebase/auth";
import firebase from "./firebase";
import "./Login.css";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
    // const [{},dispatch] = useStateValue();
    
    const signIn = ()=>{
        setPersistence(auth, browserSessionPersistence).then(()=>{
            signInWithPopup(auth, provider)
    .then((result) => result
//     {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info => result.user
//     dispatch({
//         type: actionTypes.SET_USER,
//         user: result.user,
//     })
//     console.log(result.user);
//     // console.log(token);
//     // ...
//   }
  ).catch((error) => {
    console.log(error)
  });
        })
        
    }
    

    return (
        <div className="login">
            <div className="login_container">
                <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" alt="" />
                <div className="login_text">
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login
