import React, {FC} from "react";
import {useForm} from "react-hook-form";
import css from "./Users.module.css";
import {useSelector} from "react-redux";
import {getIsAuth} from "../../../redux/authSelector";
//import {TypedDispatch} from "../../../redux/reduxStore";

type FormType = {
    term: string
    friend: 'null' | 'false' | 'true'
}

type UsersFilterFormType = {
    lastQuery: FormType
    setQueryAndParams: any
}

export const UsersFilterForm : FC<UsersFilterFormType>= (props) => {

    const isAuth = useSelector(getIsAuth)
    //const dispatch = useDispatch<TypedDispatch>()

    const { register, handleSubmit, setValue } = useForm<FormType>()

    setValue('term', props.lastQuery.term)
    setValue('friend', props.lastQuery.friend)

    console.log('UsersFilterForm, props.lastQuery:', props.lastQuery)

    return (
        <div className={css.form}>
            <form className={css.formInline} onSubmit={handleSubmit ((data) => {
                //dispatch(setLastQuery( 1, data.term, data.friend))
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
            </form>

        </div>
    )
}