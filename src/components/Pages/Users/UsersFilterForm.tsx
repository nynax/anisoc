import React, {FC} from "react";
import {useForm} from "react-hook-form";
import css from "./Users.module.css";
import {useSelector} from "react-redux";
import {getIsAuth} from "../../../redux/authSelector";
import {UsersType} from "./Users";

type FormType = {
    disabled: boolean
    clear: string
    term: string
    friend: UsersType["getParams"]["friend"]
}

type UsersFilterFormType = {
    getParams: UsersType["getParams"]
    setQueryAndParams: UsersType["setQueryAndParams"]
}

export const UsersFilterForm : FC<UsersFilterFormType>= React.memo((props) => {

    const isAuth = useSelector(getIsAuth)

    const { register, handleSubmit, setValue } = useForm<FormType>()

    //set default values from getParams
    setValue('term', props.getParams.term)
    setValue('friend', props.getParams.friend)

    return (
        <div className={css.form}>
            <form className={css.formInline} onSubmit={handleSubmit ((data) => {
                //forever go to first page
                props.setQueryAndParams(1, data.term, data.friend)
            })}>

                <input id="term" {...register("term")} placeholder="Type name here..."  />

                {isAuth &&
                    <select {...register("friend")}>
                        <option value="null">All</option>
                        <option value="true">Friends</option>
                        <option value="false">Enemies</option>
                    </select>
                }

                <button>Find</button>
                <input id="clear" {...register("clear")} disabled={!props.getParams.query} onClick={()=>{props.setQueryAndParams(1, '', 'null', false)}} type="button" value="Clear"/>
            </form>

        </div>
    )
})