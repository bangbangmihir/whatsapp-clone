import React from 'react';
import { useStateValue } from '../../context/StateProvider';
import { auth,provider } from '../../firebase';
import "./login.css"

const Login = () => {
    const [{user},dispatch]=useStateValue();
    const signIn = () =>{
        auth.signInWithPopup(provider).then(result=>{
            dispatch({
                type:"SETUSER",
                user:result.user
            })
        }).catch(error => alert(error))
    }
    return (
        <div className="loginWrapper">
        <div className="login">
            <img src="https://w7.pngwing.com/pngs/672/164/png-transparent-whatsapp-icon-whatsapp-logo-computer-icons-zubees-halal-foods-whatsapp-text-circle-unified-payments-interface.png" alt="" />
            <h2>Sign In Into Login</h2>
            <button onClick={signIn}>Login With Gmail</button>
        </div>
            
        </div>
    )
}

export default Login
