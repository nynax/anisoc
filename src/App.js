import React from "react";
import './App.css'
import Navbar from "./components/Navbar/Navbar"
import News from "./components/Pages/News/News"
import Music from "./components/Pages/Music/Music"
import Settings from "./components/Pages/Settings/Settings"
import Footer from "./components/Footer/Footer"
import {Route, Routes, BrowserRouter} from "react-router-dom"
import DialogsContainer from "./components/Pages/Dialogs/DialogsContainer";
import UsersContainer from "./components/Pages/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import ProfileContainer from "./components/Pages/Profile/ProfileContainer";
import LoginContainer from "./components/Pages/Login/LoginContainer";
import {connect} from "react-redux";
import {initializeApp} from "./redux/appReducer";


class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {

        if (!this.props.initialize) {
            return <div>loading...</div>
        }


        return (
            <BrowserRouter>
                <div className='app-wrapper'>
                    <div className='header'>
                        <HeaderContainer store={this.props.store}/>
                    </div>
                    <div className='navbar'>
                        <Navbar store={this.props.store}/>
                    </div>
                    <div className='content'>
                        <Routes>
                            <Route path='/dialogs/*' element={<DialogsContainer store={this.props.store}/>}/>
                            <Route path='/users' element={<UsersContainer store={this.props.store}/>}/>

                            <Route path="/profile/" element={<ProfileContainer store={this.props.store}/>}/>
                            <Route path="/profile/:userId" element={<ProfileContainer store={this.props.store}/>}/>

                            <Route path='/login' element={<LoginContainer {...this.props.store}/>}/>
                            <Route path='/news' element={<News/>}/>
                            <Route path='/music' element={<Music/>}/>
                            <Route path='/settings' element={<Settings/>}/>
                            <Route path='/*' element={<ProfileContainer store={this.props.store}/>}/>
                            <Route path='/' element={<ProfileContainer store={this.props.store}/>}/>
                        </Routes>
                    </div>
                    <div className='footer'>
                        <Footer/>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        initialize: state.app.initialize
    }
}

export default connect(mapStateToProps, {initializeApp})(App)
