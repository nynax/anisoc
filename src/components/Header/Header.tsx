import React, {FC} from "react"
import logo from "../../logo.svg"
import css from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {DataType} from "../../types/types";

type HeaderType = {
    isAuth: boolean
    logoutMe: () => void
    auth: DataType
}

const Header: FC<HeaderType> = (props) => {

    return (
        <header className={css.header}>
            <img src={logo} alt='react'/>
            {props.isAuth
                ?   <div className={css.login}>
                    <NavLink to={'/profile'}>{props.auth.login}</NavLink>
                    <div className={css.logout} onClick={props.logoutMe}>logout</div>
                    </div>
                : <div className={css.login}><NavLink to={'/profile'}>Login</NavLink></div> }
        </header>
    )
}


export default Header