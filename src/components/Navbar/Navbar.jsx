import React from "react"
import css from "./Navabar.module.css"
import {NavLink} from "react-router-dom"
import Preloader from "../common/Preloader/Preloader";
import {getShowPreloader} from "../../redux/usersSelector";
import {connect} from "react-redux";


const Navbar = (props) => {
    console.log('Navbar')
    //console.log(props)
    return (
        <nav className={css.navbar}>
            <div className={css.item}>
                <NavLink to='/profile' className={({ isActive }) => isActive ? css.active : undefined}>Profile</NavLink>
            </div>
            <div className={css.item}>
                <NavLink to='/dialogs' className={({ isActive }) => isActive ? css.active : undefined}>Dialogs</NavLink>
            </div>
            <div className={css.item}>
                <NavLink to='/users' className={({ isActive }) => isActive ? css.active : undefined}>Users</NavLink>
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
            <Preloader showPreloader={props.showPreloader}/>
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        showPreloader: getShowPreloader(state)
    }
}

export default connect(mapStateToProps)(Navbar)