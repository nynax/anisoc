import css from "./Users.module.css";
import {UsersFilterForm} from "./UsersFilterForm";
import PaginatedItems from "../../common/Paginator/Paginator";
import {NavLink} from "react-router-dom";
import avatar from "../../../images/maul.png";
import {followAndUnfollow} from "../../../redux/usersReducer";
import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getFollowInProgress, getTotalUsers, getUsers, getUsersPerPage} from "../../../redux/usersSelector";
import {TypedDispatch} from "../../../redux/reduxStore";

export type UsersType = {
    setQueryAndParams: (page: number, term?: string, friend?: "null" | "false" | "true", query?: boolean) => void
    getParams: {page: string | number, term: string, friend: "null" | "false" | "true", query: boolean}
}


export const Users: FC<UsersType> = React.memo((props) => {

    const dispatch = useDispatch<TypedDispatch>()

    const users = useSelector(getUsers)
    const usersPerPage = useSelector(getUsersPerPage)
    const totalUsers = useSelector(getTotalUsers)
    const followInProgress = useSelector(getFollowInProgress)

    let pagesCount = Math.ceil(totalUsers / usersPerPage)

    return <div className={css.users}>

        {/*find form*/}
        <UsersFilterForm getParams={props.getParams} setQueryAndParams={props.setQueryAndParams}/>

        {/*find form*/}
        <PaginatedItems pagesCount={pagesCount} setQueryAndParams={props.setQueryAndParams} currentPage={Number(props.getParams.page)}/>

        <div className={css.text}>
            {/*Users list*/}
            {users.map(user => {

                //Check if user in array followers
                let isFollowed = followInProgress.some(userId => userId === user.id)

                return <div className={css.user} key={user.id}>
                    <div className={css.avatar}>
                        <NavLink to={"/profile/" + user.id}><img alt='oxuenno ochen'
                                                                 src={user.photos.small ? user.photos.small : avatar}/></NavLink>
                        {/*follow and unfollow button*/}
                        {user.followed
                            ? <button disabled={isFollowed} onClick={() => {
                                dispatch(followAndUnfollow(false, user.id))
                            }}>Unfollow</button>
                            : <button disabled={isFollowed} onClick={() => {
                                dispatch(followAndUnfollow(true, user.id))
                            }}>Follow</button>
                        }
                    </div>
                    <div className={css.name}>{user.name}
                        <div className={css.status}>{user.status}</div>
                    </div>
                </div>
            })}
        </div>
    </div>
})