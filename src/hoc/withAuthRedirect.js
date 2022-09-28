import React, {useEffect} from "react"
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";

let mapStateToPropsRedirect = (state) => ({isAuth: state.auth.isAuth})


export const withAuthRedirect = (Component) => {
    const RedirectComponent = (props) => {
        console.log('ya tut')
        console.log(props)
        console.log('ya uxoju')

        let navigate = useNavigate();
        useEffect(() => {
            if (!props.isAuth) {
                console.log('isAuth - false')
                return navigate("/settings");
            }
        },[]);

        return <Component {...props}/>
    }

    return connect(mapStateToPropsRedirect)(RedirectComponent)
}