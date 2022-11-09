import React, {FC} from "react"
import css from "./Users.module.css"
import avatar from "../../../images/maul.png";
import {NavLink} from "react-router-dom";
import PaginatedItems from "../../common/Paginator/Paginator";
import {UsersContainerType} from "./UsersContainer";
import {useForm} from "react-hook-form";
import {RequestUsersType} from "../../../redux/usersReducer";

type UsersType = UsersContainerType


let Users : FC<UsersType> = (props) => {
    console.log(props)


    //Divide totalUsers on usersPerPage from API and calculate pagesCount for next pagination mapping
    let pagesCount = Math.ceil(props.totalUsers / props.usersPerPage)

    return <div className={css.users}>

        <UsersFilterForm requestUsers={props.requestUsers} lastQuery={props.lastQuery}/>
        <PaginatedItems pagesCount={pagesCount} changePage={props.changePage} currentPage={props.currentPage}/>

        <div className={css.text}>
            {/*Users list*/}
            {   props.users.map(user => {

                let followInProgress = props.followInProgress.some( userId => userId === user.id )

                return <div className={css.user} key={user.id}>
                    <div className={css.avatar}>
                        <NavLink to={"/profile/" + user.id}><img alt='oxuenno ochen' src={user.photos.small ? user.photos.small : avatar}/></NavLink>
                        {/*follow and unfollow button*/}
                        {user.followed
                            ? <button disabled={followInProgress} onClick={() => {
                                props.followAndUnfollow(false, user.id)
                            }}>Unfollow</button>
                            : <button disabled={followInProgress} onClick={() => {
                                props.followAndUnfollow(true, user.id)
                            }}>Follow</button>
                        }
                    </div>
                    <div className={css.name}>{user.name}
                        <div className={css.status}>{user.status}</div>
                    </div>
                </div>})}
            </div>
    </div>
}

type FormType = {
    term: string
    friend: 'null' | 'false' | 'true'
}

type UsersFilterFormType = {
    requestUsers: RequestUsersType
    lastQuery: FormType
}

const UsersFilterForm : FC<UsersFilterFormType>= (props) => {

    const { register, handleSubmit, setValue } = useForm<FormType>()

    setValue('term', props.lastQuery.term)
    setValue('friend', props.lastQuery.friend)

    return (
        <div className={css.form}>
            <form className={css.formInline} onSubmit={handleSubmit ((data) => {
                props.requestUsers( 1, data.term, data.friend)
            })}>

                <input id="term" {...register("term")} placeholder="Type name here..."  />


                <select {...register("friend")}>
                    <option value="null">All</option>
                    <option value="true">Friends</option>
                    <option value="false">Enemies</option>
                </select>

                <button>Find</button>
            </form>

        </div>
    )
}

export default Users