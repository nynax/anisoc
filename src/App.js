import React, {Suspense} from "react";
import './App.css'
import Navbar from "./components/Navbar/Navbar"
import News from "./components/Pages/News/News"
import Music from "./components/Pages/Music/Music"
import Settings from "./components/Pages/Settings/Settings"
import Footer from "./components/Footer/Footer"
import {Route, Routes, BrowserRouter} from "react-router-dom"
import HeaderContainer from "./components/Header/HeaderContainer";
/*import DialogsContainer from "./components/Pages/Dialogs/DialogsContainer";
import UsersContainer from "./components/Pages/Users/UsersContainer";
import ProfileContainer from "./components/Pages/Profile/ProfileContainer";*/

import {connect} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";

const ProfileContainer = React.lazy(() => import("./components/Pages/Profile/ProfileContainer"))
const DialogsContainer = React.lazy(() => import("./components/Pages/Dialogs/DialogsContainer"))
const UsersContainer = React.lazy(() => import("./components/Pages/Users/UsersContainer"))

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {

        if (!this.props.initialize) {
            return <div className="mainPreloader"><Preloader showPreloader={true}/></div>
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
                            <Route path='/dialogs/*' element={<Suspense><DialogsContainer store={this.props.store}/></Suspense>}/>
                            <Route path='/users' element={<Suspense><UsersContainer store={this.props.store}/></Suspense>}/>
                            <Route path="/profile/" element={<Suspense><ProfileContainer store={this.props.store}/></Suspense>}/>
                            <Route path="/profile/:userId" element={<Suspense><ProfileContainer store={this.props.store}/></Suspense>}/>
                            {/*<Route path='/dialogs/*' element={<DialogsContainer store={this.props.store}/>}/>
                            <Route path='/users' element={<UsersContainer store={this.props.store}/>}/>
                            <Route path="/profile/" element={<ProfileContainer store={this.props.store}/>}/>
                            <Route path="/profile/:userId" element={<ProfileContainer store={this.props.store}/>}/>*/}
                            <Route path='/news' element={<News/>}/>
                            <Route path='/music' element={<Music/>}/>
                            <Route path='/settings' element={<Settings/>}/>
                            <Route path='/*' element={<Suspense><ProfileContainer store={this.props.store}/></Suspense>}/>
                            <Route path='/' element={<Suspense><ProfileContainer store={this.props.store}/></Suspense>}/>
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
