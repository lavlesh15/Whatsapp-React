import React from 'react';
import './Login.css';
import {Button} from "@material-ui/core";
import {auth , provider } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';


export const Login = () => {

    const [{}, dispatch] = useStateValue();

    const signin = () => {

        auth.signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type : actionTypes.SET_USER,
                user: result.user,
            });
        })
        .catch((error) => alert(error.message));
    
    };

    return (
        
        <div className="login">

        <div className="login_container">

        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg">
        </img>

        <div className="login_text">

        <h1>Sign In To Whatsapp </h1>

        </div>

        <Button onClick={signin} >
            Sign In With Google

        </Button>

        

        </div>

        <div className="foot">
            <h5>Copyright &copy; 2021 Lavlesh Singh | All rights reserved. </h5>
        </div>


        

        </div>
       
    )
}

export default Login;