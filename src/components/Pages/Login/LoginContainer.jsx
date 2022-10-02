import React from "react"
import css from "./Login.module.css"
import { useForm }from "react-hook-form"



const LoginContainer = () => {

    //Form Init
    const { register, handleSubmit } = useForm()

    return (
        <div className={css.form}>
            <form className={css.formInline} onSubmit={handleSubmit ((data) => {
                console.log(data)
            })}>
                <label htmlFor="login">Login:</label>
                <input id="login" {...register("login", {
                    required: "This is required",
                    minLength:{
                        value: 5,
                        message: "minLength is 5"
                    },
                    maxLength:{
                        value: 20,
                        message: "maxLength is 20"
                    }
                })} placeholder="Login please..."/>
                <label htmlFor="password">Password:</label>
                <input id="password" {...register("password", {
                    required: "This is required"}) } placeholder="Password please..."/>
                <button>Send</button>
            </form>
        </div>
    )
}


export default LoginContainer