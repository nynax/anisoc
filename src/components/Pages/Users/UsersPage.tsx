import React, {FC, useEffect} from "react"
import css from "./Users.module.css"
import avatar from "../../../images/maul.png";
import {NavLink, useLocation, useSearchParams} from "react-router-dom";
import PaginatedItems from "../../common/Paginator/Paginator";
import {UsersFilterForm} from "./UsersFilterForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getFollowInProgress,
    getTotalUsers,
    getUsers,
    getUsersPerPage
} from "../../../redux/usersSelector";
import {TypedDispatch} from "../../../redux/reduxStore";
import {followAndUnfollow, requestUsers} from "../../../redux/usersReducer";

type UsersPageType = {}

/*type SearchParamsType = {
    currentPage? : string
    term? : string
    friend? : "false" | "true" | "null"
}*/

let UsersPage: FC<UsersPageType> = React.memo(() => {
    //console.log(props)


    const dispatch = useDispatch<TypedDispatch>()

    //state
    const users = useSelector(getUsers)
    const totalUsers = useSelector(getTotalUsers)
    //const currentPage = useSelector(getCurrentPage)
    const usersPerPage = useSelector(getUsersPerPage)
    const followInProgress = useSelector(getFollowInProgress)
    //const lastQuery = useSelector(getLastQuery)

    const [searchParams, setSearchParams] = useSearchParams();
    //console.log(searchParams.get('term'))
    //console.log(lastQuery)
    console.log(searchParams)
    let location = useLocation();
    console.log(location)

    let query = {
        page : searchParams.get('page') ? searchParams.get('page') : 1,
        term : searchParams.get('term') ? searchParams.get('term') : '',
        friend : searchParams.get('friend') ? searchParams.get('friend') : 'null',
    }

    //dispatches
    const _changePage = (page: number, term = query.term, friend = query.friend) => {
        //dispatch(setLastQuery(pageNumber, term, friend))
        /*@ts-ignore*/
        setSearchParams({ page, term, friend})
    }


    useEffect(() => {
        console.log('useEffect: location.search')
        console.log(query)
        /*@ts-ignore*/
        dispatch(requestUsers(Number(query.page), query.term, query.friend ))

        /*if (location.search) {
            console.log('location.search is true')
            setSearchParams({page: String(query.page), term: query.term, friend: query.friend})

        }*/ /*else {
            setSearchParams({})
        }*/
    }, [location.search])



    //Divide totalUsers on usersPerPage from API and calculate pagesCount for next pagination mapping
    let pagesCount = Math.ceil(totalUsers / usersPerPage)

    return <div className={css.users}>
        {/*@ts-ignore*/}
        <UsersFilterForm lastQuery={query} setSearchParams={setSearchParams}/>
        {/*@ts-ignore*/}
        <PaginatedItems pagesCount={pagesCount} changePage={_changePage} currentPage={query.page}/>

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


export default UsersPage