import React, {FC, useEffect} from "react"
import css from "./Login.module.css"
import { useForm }from "react-hook-form"
import {connect} from "react-redux";
import {
    InitAuthType,
    loginMe, LoginMeType,
    setAuthError,
    SetAuthErrorType,
    setCaptcha,
    SetCaptchaType
} from "../../../redux/authReducer";
import {AppStateType} from "../../../redux/reduxStore";
import {getAuthError, getCaptcha, getIsAuth} from "../../../redux/authSelector";

type LoginType = InitAuthType & DispatchToPropsType

type FormType = {
    login: string
    password: string
    rememberMe: boolean
    captcha: string
}

const LoginContainer : FC<LoginType> = (props) => {

    //return state to default
    useEffect(() => {
        props.setAuthError(null)
        props.setCaptcha(null)
    },[]);


    console.log(props)
    //Form Init
    const { register, handleSubmit, formState: { errors } } = useForm<FormType>()
    //console.log(errors)
    //debugger
    return (
        <div className={css.form}>
            <form className={css.formInline} onSubmit={handleSubmit ((data) => {
                props.loginMe(data.login, data.password, data.rememberMe, data.captcha ? data.captcha : null)
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

                {props.captcha !== null && <div>
                    <div className={css.captchaImg}><img src={props.captcha} alt="captcha"/></div>
                    <input id="captcha" {...register("captcha", {required: "Need captcha code"})} placeholder="captcha code"/>
                </div>}


                <button>Send</button>
            </form>
            <div className={css.errors}>
                {errors.login !== undefined && <div>{errors.login.message}</div>}
                {errors.password !== undefined && <div>{errors.password.message}</div>}
                {props.authError !== null && <div>{props.authError}</div>}

            </div>
        </div>
    )
}

type StateToPropsType = InitAuthType

type DispatchToPropsType = {
    loginMe: LoginMeType
    setAuthError: SetAuthErrorType
    setCaptcha: SetCaptchaType
}

const mapStateToProps = (state : AppStateType) : StateToPropsType => {
    return {
        isAuth: getIsAuth(state),
        authError: getAuthError(state),
        captcha: getCaptcha(state)
    }
}

export default connect<StateToPropsType, DispatchToPropsType, {}, AppStateType>(mapStateToProps, {loginMe, setAuthError, setCaptcha})(LoginContainer)
