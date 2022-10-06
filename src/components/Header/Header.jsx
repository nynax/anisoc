import React from "react"
import logo from "../../logo.svg"
import css from "./Header.module.css"
import {NavLink} from "react-router-dom";


const Header = (props) => {

    return (
        <header className={css.header}>
            <img src={logo} alt='react'/>
            {props.isAuth
                ?   <div className={css.login}>
                    <NavLink to={'/profile'}>{props.auth.login}</NavLink>
                    <div className={css.logout} onClick={props.logout}>logout</div>
                    </div>
                : <div className={css.login}><NavLink to={'/profile'}>Login</NavLink></div> }
        </header>
    )
}


export default Header