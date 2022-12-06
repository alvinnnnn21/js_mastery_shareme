import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/videos/share.mp4';
import logo from '../assets/images/logowhite.png';
import { auth, googleAuthProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth'

import { client } from '../client';

const Login = () => {

    const navigate = useNavigate();

    const responseGoogle = (response) => {

        localStorage.setItem("user", JSON.stringify(response.profileObj));

        const {name, googleId, imageUrl } = response.profileObj; 

        const doc = {
            _id: googleId,
            _type: "user",
            username: name,
            image: imageUrl
        }

        client.createIfNotExists(doc)
            .then(() => {
                navigate("/", {replace: true});
            })
    }

    const onLoginGoogle = () => {
        signInWithPopup(auth, googleAuthProvider)   
            .then((result) => {
                const user = result.user;

                const data = {
                    "email": user.email,
                    "name": user.displayName,
                    "uid": user.uid,
                    "isUsingFirebase": true
                };

                localStorage.setItem("user", JSON.stringify(user));

                const doc = {
                    _id: data.uid,
                    _type: "user",
                    username: data.name,
                    image: user.photoURL
                }

                client.createIfNotExists(doc)
                    .then(() => {
                        navigate("/", {replace: true});
                    })

        }).catch((error) => {
        });
    }

    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className="relative w-full h-full">
                <video 
                    src={shareVideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className="w-full h-full object-cover"
                />
                <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                    <div className="p-5">
                        <img src={logo} width="130px" alt="logo"/>
                    </div>
                    <div className="shadow-2xl">
                        <button onClick={onLoginGoogle} className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none">
                                <FcGoogle className="mr-4"/>
                                Sign in with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
