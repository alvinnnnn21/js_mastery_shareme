import React, { useState, useEffect }  from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const randomImg = "https://source.unsplash.com/1600x900/?nature,photography,technology";
const activeBtnStyle = "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyle = "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = () => {

    const[user, setUser] = useState(null);
    const[pins, setPins] = useState(null);
    const[text, setText] = useState("created");
    const[activeBtn, setActiveBtn] = useState("created");
    const navigate = useNavigate();
    const {userId} = useParams();

    const fetchUser = () => {
        const query = userQuery(userId);

        client.fetch(query)
            .then((res) => {
                console.log(res);
                setUser(res[0]);
            });
    }

    useEffect(() => {
        fetchUser();
    }, [userId]);

    useEffect(() => {
        if(text === "created")
        {
            const createdPinsQuery = userCreatedPinsQuery(userId);

            client.fetch(createdPinsQuery)
                .then((res) => {
                    setPins(res);
                })
        }
        else 
        {
            const savedPinsQuery = userSavedPinsQuery(userId);

            client.fetch(savedPinsQuery)
                .then((res) => {
                    setPins(res);
                })
        }
    }, [text, userId]);

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    }

    if(!user) {
        return <Spinner message="Loading profile..."/>
    }

    return (
        <div className="relative pb-2 h-full justify-center items-center">
            <div className="flex flex-col pb-5">
                <div className="relative flex flex-col mb-7">
                    <div className="flex flex-col jusitify-center items-center">
                        <img src={randomImg} className="w-full h-370 2xl:h-50 shadow-lg object-cover" alt="user-profile"/>
                        <img src={user.image} className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"/>
                        <h1 className="font-bold text-3xl text-center mt-3">
                            {user.username}
                        </h1>
                        <div className="absolute top-0 z-1 right-0 p-2">
                            {userId === user._id && (
                                <GoogleLogout
                                    clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                                    render={(render) => (
                                        <button
                                            type="button"
                                            className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                                            onClick={render.onClick}
                                            disabled={render.disabled}
                                        >
                                            <AiOutlineLogout color="red" fontSize={21}/>
                                        </button>
                                    )}
                                    onLogoutSuccess={logout}
                                    cookiePolicy="single_host_origin"
                                />
                            )}
                        </div>
                    </div>
                    <div className="text-center mb-7">
                        <button
                            type="button"
                            onClick={(e) => {
                                setText(e.target.textContent)
                                setActiveBtn("created")
                            }}
                            className={`${activeBtn === 'created' ? activeBtnStyle : notActiveBtnStyle}`}
                        >
                            Created
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                setText(e.target.textContent)
                                setActiveBtn("saved")
                            }}
                            className={`${activeBtn === 'saved' ? activeBtnStyle : notActiveBtnStyle}`}
                        >
                            Saved
                        </button>
                    </div>
                    {pins?.length > 0 ? (
                        <div className="px-2">
                            <MasonryLayout pins={pins}/>
                        </div>
                    ) : (
                        <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
                            No Pins Found!
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserProfile
