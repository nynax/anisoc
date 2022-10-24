import React, {useEffect} from "react"
import css from "./Login.module.css"
import { useForm }from "react-hook-form"
import {connect} from "react-redux";
import {login, setAuthError, setCaptcha} from "../../../redux/authReducer";



const LoginContainer = (props) => {

    //return state to default
    useEffect(() => {
        props.setAuthError(null)
        props.setCaptcha(null)
    },[]);


    console.log(props)
    //Form Init
    const { register, handleSubmit, formState: { errors } } = useForm()
    //console.log(errors)
    //debugger
    return (
        <div className={css.form}>
            <form className={css.formInline} onSubmit={handleSubmit ((data) => {
                props.login(data.login, data.password, data.rememberMe, data.captcha ? data.captcha : null)
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

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        authError: state.auth.authError,
        captcha: state.auth.captcha
    }
}


export default connect(mapStateToProps, {login, setAuthError, setCaptcha})(LoginContainer)
