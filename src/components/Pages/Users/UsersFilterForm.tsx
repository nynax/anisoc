import {RequestUsersType} from "../../../redux/usersReducer";
import React, {FC} from "react";
import {useForm} from "react-hook-form";
import css from "./Users.module.css";
import {useSelector} from "react-redux";
import {getIsAuth} from "../../../redux/authSelector";

type FormType = {
    term: string
    friend: 'null' | 'false' | 'true'
}

type UsersFilterFormType = {
    requestUsers: RequestUsersType
    lastQuery: FormType
    setSearchParams: any
}

export const UsersFilterForm : FC<UsersFilterFormType>= (props) => {

    const isAuth = useSelector(getIsAuth)

    const { register, handleSubmit, setValue } = useForm<FormType>()



    setValue('term', props.lastQuery.term)
    setValue('friend', props.lastQuery.friend)

    return (
        <div className={css.form}>
            <form className={css.formInline} onSubmit={handleSubmit ((data) => {
                props.requestUsers( 1, data.term, data.friend)
                props.setSearchParams({page: 1, term: data.term, friend: data.friend})

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
            </form>

        </div>
    )
}