import React, {FC} from "react"
import css from "./Users.module.css"
import avatar from "../../../images/maul.png";
import {NavLink} from "react-router-dom";
import PaginatedItems from "../../common/Paginator/Paginator";
import {UsersContainerType} from "./UsersContainer";
import {useForm} from "react-hook-form";

type UsersType = UsersContainerType


let Users : FC<UsersType> = (props) => {
//    console.log(props)


    //Divide totalUsers on usersPerPage from API and calculate pagesCount for next pagination mapping
    let pagesCount = Math.ceil(props.totalUsers / props.usersPerPage)

    return <div className={css.users}>

        <UsersFilterForm />

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

const UsersFilterForm = () => {
    const { register, handleSubmit } = useForm<FormType>()

    //console.log(errors)
    //debugger
    return (
        <div className={css.form}>
            <form className={css.formInline} onSubmit={handleSubmit ((data) => {
                console.log(data)
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