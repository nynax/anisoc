import React from "react"
import css from "./Navabar.module.css"
import {NavLink} from "react-router-dom"
import Preloader from "../common/Preloader/Preloader";
import {getLastQuery, getShowPreloader} from "../../redux/usersSelector";
import {useSelector} from "react-redux";


const Navbar = React.memo(() => {
    //console.log('Navbar', props)
    const lastQuery = useSelector(getLastQuery)
    const showPreloader = useSelector(getShowPreloader)
    console.log('Navbar > lastQuery', lastQuery)

    //add get params to link if lastQuery.query exist
    let query = '/users'
    if (lastQuery.query){
        query = '/users?page=' + lastQuery.page + '&term=' + lastQuery.term + '&friend=' + lastQuery.friend
    }

    return (
        <nav className={css.navbar}>
            <div className={css.item}>
                <NavLink to='/profile' className={({ isActive }) => isActive ? css.active : undefined}>Profile</NavLink>
            </div>
            <div className={css.item}>
                <NavLink to='/dialogs' className={({ isActive }) => isActive ? css.active : undefined}>Dialogs</NavLink>
            </div>
            <div className={css.item}>
                <NavLink to='/chat' className={({ isActive }) => isActive ? css.active : undefined}>Chat</NavLink>
            </div>
            <div className={css.item}>
                <NavLink to={query} className={({ isActive }) => isActive ? css.active : undefined}>Users</NavLink>
            </div>
            <div className={css.item}>
                <NavLink to='/news' className={({ isActive }) => isActive ? css.active : undefined}>News</NavLink>
            </div>
            <div className={css.item}>
                <NavLink to='/music' className={({ isActive }) => isActive ? css.active : undefined}>Music</NavLink>
            </div>
            <div className={css.item}>
                <NavLink to='/settings' className={({ isActive }) => isActive ? css.active : undefined}>Settings</NavLink>
            </div>
            <div className={css.preloader}>
            <Preloader showPreloader={showPreloader}/>
            </div>
        </nav>
    )
})


export default Navbar