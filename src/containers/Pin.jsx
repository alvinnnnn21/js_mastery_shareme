import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavBar, Feed, PinDetail, CreatePin, Search } from '../components';

const Pin = ({user}) => {

    const[searchKeyword, setSearchKeyword] = useState("");

    return (
        <div className="px-2 md:px-5">
            <div className="bg-gray-50">
                <NavBar searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} user={user}/>
            </div>
            <div className="h-full">
                <Routes>
                    <Route path="/" element={<Feed/>}/>
                    <Route path="/category/:categoryId" element={<Feed/>}/>
                    <Route path="/pin-detail/:pinId" element={<PinDetail user={user}/>}/>
                    <Route path="/create-pin" element={<CreatePin user={user}/>}/>
                    <Route path="/search" element={<Search searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword}/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default Pin
