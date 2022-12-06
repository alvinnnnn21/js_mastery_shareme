import React from 'react'
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
 
import Login from './components/Login';
import Home from './containers/Home';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/*" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
