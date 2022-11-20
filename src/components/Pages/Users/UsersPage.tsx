import React, {FC, useEffect} from "react"
import css from "./Users.module.css"
import avatar from "../../../images/maul.png";
import {NavLink, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import PaginatedItems from "../../common/Paginator/Paginator";
import {UsersFilterForm} from "./UsersFilterForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getFollowInProgress, getLastQuery,
    getTotalUsers,
    getUsers,
    getUsersPerPage
} from "../../../redux/usersSelector";
import {TypedDispatch} from "../../../redux/reduxStore";
import {followAndUnfollow, requestUsers, setLastQuery} from "../../../redux/usersReducer";
import {Users} from "./Users";

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
    //const users = useSelector(getUsers)
    const totalUsers = useSelector(getTotalUsers)
    //const currentPage = useSelector(getCurrentPage)
    //const usersPerPage = useSelector(getUsersPerPage)
    //const followInProgress = useSelector(getFollowInProgress)
    const lastQuery = useSelector(getLastQuery)

    const [searchParams, setSearchParams] = useSearchParams();
    //console.log(searchParams.get('term'))
    //console.log(lastQuery)

    let location = useLocation();
    console.log(location)

    let params = {
        page : searchParams.get('page') ? searchParams.get('page') : 1,
        term : searchParams.get('term') ? searchParams.get('term') : '',
        friend : searchParams.get('friend') ? searchParams.get('friend') : 'null',
        disabled: !!(searchParams.get('page') || searchParams.get('term') || searchParams.get('term'))
    }

    console.log('------------')
    console.log('Query: ', params)
    console.log('lastQuery: ', lastQuery)
    console.log('------------')

    //dispatches

    const setQueryAndParams = (page: number, term = params.term, friend = params.friend, query = true) => {
        console.log('setQueryAndParams', page)

        /*@ts-ignore*/
        dispatch(setLastQuery(page, term, friend, query))

        if (query){
            /*@ts-ignore*/
            setSearchParams({ page, term, friend})
        }else{
            setSearchParams({})
        }

    }

    //const navigate = useNavigate();

    useEffect(() => {
        if (lastQuery.query) {
            // @ts-ignore
            setSearchParams({ page:lastQuery.page, term:lastQuery.term, friend:lastQuery.friend})
            //navigate('/users?page=' + lastQuery.page + '&term=' + lastQuery.term + '&friend=' + lastQuery.friend);
        }
    }, [location.search]);

    //
    useEffect(() => {
        console.log('useEffect: lastQuery was changed')
        console.log(params)
        /*@ts-ignore*/
        dispatch(requestUsers(Number(params.page), params.term, params.friend ))

        /*if (location.search) {
            console.log('location.search is true')
            setSearchParams({page: String(query.page), term: query.term, friend: query.friend})

        }*/ /*else {
            setSearchParams({})
        }*/
    }, [lastQuery.page, lastQuery.term, lastQuery.friend, lastQuery.query])

    //Если в урле нет параметров, нужно проверить наличие данных в последнем запросе и если они есть, отрендерить их и передать в URL
    /*if (!location.search){
        if (lastQuery.query){
            console.log('lastQuery is true', lastQuery)
            /!*@ts-ignore*!/
            setSearchParams({ page:lastQuery.page, term:lastQuery.term, friend:lastQuery.friend})
            //console.log(users)
            return <Users lastQuery={lastQuery} setQueryAndParams={setQueryAndParams}/>
        }
    }*/



    //console.log(query)






    return <Users lastQuery={params} setQueryAndParams={setQueryAndParams}/>



})


export default UsersPage