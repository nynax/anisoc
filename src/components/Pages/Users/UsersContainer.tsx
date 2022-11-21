import React, {FC, useEffect} from "react"
import {useLocation, useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {TypedDispatch} from "../../../redux/reduxStore";
import {requestUsers, setLastQuery} from "../../../redux/usersReducer";
import {Users} from "./Users";

type UsersPageType = {}

const UsersContainer: FC<UsersPageType> = React.memo(() => {

    const dispatch = useDispatch<TypedDispatch>()

    const [searchParams, setSearchParams] = useSearchParams();

    const location = useLocation();

    const getParams = {
        page : searchParams.get('page') ? searchParams.get('page') as string : 1,
        term : searchParams.get('term') ? searchParams.get('term') as string : '',
        friend : searchParams.get('friend') ? searchParams.get('friend') as 'false' | 'true' | 'null' : 'null',
        query: !!(searchParams.get('page') || searchParams.get('term') || searchParams.get('term')) //flag for cancel button in form
    }

    //dispatch setLastQuery and update get params in address string
    const setQueryAndParams = (page: number, term = getParams.term, friend = getParams.friend, query = true) => {
        console.log('setQueryAndParams >', {page, term, friend, query})

        dispatch(setLastQuery(page, term, friend, query))

        //for change location.search (update get params) and run useEffect
        if (query){
            /*@ts-ignore*/
            setSearchParams({ page, term, friend})
        }else{
            setSearchParams({})
        }

    }

    //dispatch requestUsers if location.search was changed or first time page load
    useEffect(() => {
        console.log('useEffect > getParams', getParams)
        dispatch(requestUsers(Number(getParams.page), getParams.term, getParams.friend ))

    }, [location.search])



    return <Users getParams={getParams} setQueryAndParams={setQueryAndParams}/>

})



export default UsersContainer