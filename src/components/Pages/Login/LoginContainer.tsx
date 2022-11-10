import React, {FC, useEffect} from "react"
import css from "./Login.module.css"
import { useForm }from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import {
    loginMe,
    setAuthError,
    setCaptcha
} from "../../../redux/authReducer";
import {getAuthError, getCaptcha} from "../../../redux/authSelector";
import {TypedDispatch} from "../../../redux/reduxStore";

type LoginType = { }

type FormType = {
    login: string
    password: string
    rememberMe: boolean
    captcha: string
}

export const LoginContainer : FC<LoginType> = () => {

    const dispatch = useDispatch<TypedDispatch>()

    const authError = useSelector(getAuthError)
    const captcha = useSelector(getCaptcha)

    const _setAuthError = (errorMsg: string | null) => {
        dispatch(setAuthError(errorMsg))
    }
    const _loginMe = (email: string, password: string, rememberMe: boolean, captcha: string | null) => {
        dispatch(loginMe(email, password, rememberMe, captcha))
    }
    const _setCaptcha = (captchaUrl: string | null) => {
        dispatch(setCaptcha(captchaUrl))
    }

    //return state to default
    useEffect(() => {
        _setAuthError(null)
        _setCaptcha(null)
    },[]);


    //console.log(props)
    //Form Init
    const { register, handleSubmit, formState: { errors } } = useForm<FormType>()
    //console.log(errors)
    //debugger
    return (
        <div className={css.form}>
            <form className={css.formInline} onSubmit={handleSubmit ((data) => {
                _loginMe(data.login, data.password, data.rememberMe, data.captcha ? data.captcha : null)
            })}>

                <input id="login" {...register("login", {
                    required: "Login is required",
                    pattern: {
                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Email is incorrect"
                    }
                })} placeholder="Type login here..."  />


                <input type="password" id="password" {...register("password", {required: "Password is required"}) } placeholder="...and password..."/>
                <div>
                    <input type="checkbox" id="rememberMe" {...register("rememberMe")} />
                    <span className={css.rememberMe}>remember me</span>
                </div>

                {captcha !== null && <div>
                    <div className={css.captchaImg}><img src={captcha} alt="captcha"/></div>
                    <input id="captcha" {...register("captcha", {required: "Need captcha code"})} placeholder="captcha code"/>
                </div>}


                <button>Send</button>
            </form>
            <div className={css.errors}>
                {errors.login !== undefined && <div>{errors.login.message}</div>}
                {errors.password !== undefined && <div>{errors.password.message}</div>}
                {authError !== null && <div>{authError}</div>}

            </div>
        </div>
    )
}
