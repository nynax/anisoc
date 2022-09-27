import React from "react"
import logo from "../../logo.svg"
import css from "./Header.module.css"
import {NavLink} from "react-router-dom";


const Header = (props) => {
    //console.log(props)
    return (
        <header className={css.header}>
            <img src={logo} alt='react'/>
            <div className={css.login}>{props.data.isAuth ? <NavLink to={'/profile/'}>{props.data.auth.login}</NavLink> : 'Login' }</div>
        </header>
    )
}


export default Header