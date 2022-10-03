import React from "react"
import css from "./Login.module.css"
import { useForm }from "react-hook-form"



const LoginContainer = () => {

    //Form Init
    const { register, handleSubmit, formState: { errors } } = useForm()
    console.log(errors)
    return (
        <div className={css.form}>
            <form className={css.formInline} onSubmit={handleSubmit ((data) => {
                console.log(data)
            })}>
                <label htmlFor="login">Login:</label>
                <input id="login" {...register("login", {
                    required: "Login is required",
                    minLength:{
                        value: 5,
                        message: "Login minLength is 5"
                    },
                    maxLength:{
                        value: 20,
                        message: "Login maxLength is 20"
                    }
                })} placeholder="Login please..." aria-invalid={errors.login ? "true" : "false"} />




                <label htmlFor="password">Password:</label>
                <input type="password" id="password" {...register("password", {
                    required: "Password is required"}) } placeholder="Password please..."/>
                <button>Send</button>
            </form>
            <div className={css.errors}>
                {errors.login !== undefined && <div>{errors.login.message}</div>}
                {errors.password !== undefined && <div>{errors.password.message}</div>}
            </div>
        </div>
    )
}


export default LoginContainer