import React from "react"
import css from "./Login.module.css"
import { useForm }from "react-hook-form"
import {connect} from "react-redux";
import {login} from "../../../redux/authReducer";



const LoginContainer = (props) => {

    if (props.isAuth) return <div className={css.text}>Already logged in!</div>

    console.log(props)
    //Form Init
    const { register, handleSubmit, formState: { errors } } = useForm()
    console.log(errors)
    //debugger
    return (
        <div className={css.form}>
            <form className={css.formInline} onSubmit={handleSubmit ((data) => {
                props.login(data.login, data.password, data.rememberMe)

            })}>

                <input id="login" {...register("login", {
                    required: "Login is required",
                    minLength:{
                        value: 5,
                        message: "Login minLength is 5"
                    },
                    maxLength:{
                        value: 50,
                        message: "Login maxLength is 50"
                    }
                })} placeholder="Type login here..." aria-invalid={errors.login ? "true" : "false"} />


                <input type="password" id="password" {...register("password", {
                    required: "Password is required"}) } placeholder="...and password..."/>
                <div><input type="checkbox" id="rememberMe" {...register("rememberMe")} /><span className={css.rememberMe}>remember me</span></div>
                <button>Send</button>
            </form>
            <div className={css.errors}>
                {errors.login !== undefined && <div>{errors.login.message}</div>}
                {errors.password !== undefined && <div>{errors.password.message}</div>}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}


export default connect(mapStateToProps, {login})(LoginContainer)



//export default LoginContainer