import React, {useEffect} from "react"
import {connect} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

let mapStateToPropsRedirect = (state) => ({isAuth: state.auth.isAuth})


export const withAuthRedirect = (Component) => {
    const RedirectComponent = (props) => {

        console.log('RedirectComponent Start')

        const params = useParams()


        console.log(props)
        console.log(params)
        console.log('--------')

        let navigate = useNavigate();
        useEffect(() => {
            if (!props.isAuth) {
                console.log('isAuth - false')
                return navigate("/settings");
            }
        },[]);



        return <Component {...props} userId={params.userId ? params.userId : props.myUserId}/>
    }

    return connect(mapStateToPropsRedirect)(RedirectComponent)
}