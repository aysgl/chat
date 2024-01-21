import React from 'react'
import { auth, googleProvider, facebookProvider, githubProvider, twitterProvider } from '../firebase/config'
import Google from '../components/Icons/Google';
import Facebbook from '../components/Icons/Facebbook';
import Github from '../components/Icons/Github';
import Twittter from '../components/Icons/Twittter';
import { signInWithPopup } from 'firebase/auth';

const Auth = ({ setIsAuth }) => {
    const handleGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then(data => {
                setIsAuth(true)
                localStorage.setItem("token", data.user.refreshToken)
            })
    }
    const handleFacebook = () => {
        signInWithPopup(auth, facebookProvider)
            .then(data => {
                setIsAuth(true)
                localStorage.setItem("token", data.user.accessToken)
            })
    }
    const handleGithub = () => {
        signInWithPopup(auth, githubProvider)
            .then(data => {
                setIsAuth(true)
                console.log(data)
                localStorage.setItem("token", data.user.accessToken)
            })
    }
    const handleTwitter = () => {
        signInWithPopup(auth, twitterProvider)
            .then(data => {
                setIsAuth(true)
                localStorage.setItem("token", data.user.accessToken)
            })
    }

    return (
        <div className='login'>
            <div>
                <h1>Do you want to chat?</h1>
                <p>Please select with...</p>
                <button onClick={handleGoogle}><Google />Google</button>
                <button onClick={handleFacebook}><Facebbook /> Facebook</button>
                <br />
                <button onClick={handleGithub}><Github /> Github</button>
                <button onClick={handleTwitter}><Twittter /> Twitter</button>
            </div>
        </div>
    );
}

export default Auth