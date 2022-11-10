import React, {FC, useEffect} from "react"
import css from "./Users.module.css"
import avatar from "../../../images/maul.png";
import {NavLink} from "react-router-dom";
import PaginatedItems from "../../common/Paginator/Paginator";
import {UsersFilterForm} from "./UsersFilterForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowInProgress, getLastQuery,
    getTotalUsers,
    getUsers,
    getUsersPerPage
} from "../../../redux/usersSelector";
import {TypedDispatch} from "../../../redux/reduxStore";
import {changePage, followAndUnfollow, requestUsers, RequestUsersType} from "../../../redux/usersReducer";

type UsersPageType = { }

let UsersPage : FC<UsersPageType> = () => {
    //console.log(props)

    const dispatch = useDispatch<TypedDispatch>()

    //state
    const users = useSelector(getUsers)
    const totalUsers = useSelector(getTotalUsers)
    const currentPage = useSelector(getCurrentPage)
    const usersPerPage = useSelector(getUsersPerPage)
    const followInProgress = useSelector(getFollowInProgress)
    const lastQuery = useSelector(getLastQuery)

    //dispatches
    const _changePage = (pageNumber : number) => {
        dispatch(changePage(pageNumber))
    }

    const _requestUsers : RequestUsersType = (currentPage, term, friend) => {
        dispatch(requestUsers(currentPage, term, friend))
    }

    useEffect(() => {
        _requestUsers(currentPage, lastQuery.term, lastQuery.friend)
    },[currentPage]);

    //Divide totalUsers on usersPerPage from API and calculate pagesCount for next pagination mapping
    let pagesCount = Math.ceil(totalUsers / usersPerPage)

    return <div className={css.users}>

        <UsersFilterForm requestUsers={_requestUsers} lastQuery={lastQuery}/>
        <PaginatedItems pagesCount={pagesCount} changePage={_changePage} currentPage={currentPage}/>

        <div className={css.text}>
            {/*Users list*/}
            {   users.map(user => {

                //Check if user in array followers
                let isFollowed = followInProgress.some( userId => userId === user.id )

                return <div className={css.user} key={user.id}>
                    <div className={css.avatar}>
                        <NavLink to={"/profile/" + user.id}><img alt='oxuenno ochen' src={user.photos.small ? user.photos.small : avatar}/></NavLink>
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
                </div>})}
            </div>
    </div>
}



export default UsersPage