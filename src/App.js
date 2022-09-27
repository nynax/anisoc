import React from "react";
import './App.css'
import Navbar from "./components/Navbar/Navbar"
import {Profile} from "./components/Pages/Profile/Profile"
import News from "./components/Pages/News/News"
import Music from "./components/Pages/Music/Music"
import Settings from "./components/Pages/Settings/Settings"
import Footer from "./components/Footer/Footer"
import {Route, Routes, BrowserRouter} from "react-router-dom"
import DialogsContainer from "./components/Pages/Dialogs/DialogsContainer";
import UsersContainer from "./components/Pages/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";


const App = (props) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <div className='header'>
                    <HeaderContainer store={props.store}/>
                </div>
                <div className='navbar'>
                    <Navbar store={props.store}/>
                </div>
                <div className='content'>
                    <Routes>
                        <Route path='/dialogs/*' element={<DialogsContainer store={props.store}/>}/>
                        <Route path='/users' element={<UsersContainer store={props.store}/>}/>

                        <Route path="/profile/" element={<Profile store={props.store}/>}/>
                        <Route path="/profile/:userId" element={<Profile store={props.store}/>}/>


                        <Route path='/news' element={<News/>}/>
                        <Route path='/music' element={<Music/>}/>
                        <Route path='/settings' element={<Settings/>}/>
                        <Route path='/*' element={<Profile store={props.store}/>}/>
                        <Route path='/' element={<Profile store={props.store}/>}/>
                    </Routes>
                </div>
                <div className='footer'>
                    <Footer/>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
