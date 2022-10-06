import React from "react"
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import LoginContainer from "../components/Pages/Login/LoginContainer";

let mapStateToPropsRedirect = (state) => ({isAuth: state.auth.isAuth})


export const withAuthRedirect = (Component) => {
    const RedirectComponent = (props) => {

        console.log('RedirectComponent Start')
        //console.log(props)

        const params = useParams()

       /* let navigate = useNavigate();
        useEffect(() => {
            if (!props.isAuth) {
                console.log('isAuth - false')
                return navigate("/login");
            }else{
                console.log('isAuth - true')

            }
        },[]);*/

        if (!props.isAuth) {
            return <LoginContainer {...props.store}/>
        }else{
            return <Component {...props} userId={params.userId ? params.userId : props.myUserId}/>
        }
        //



    }

    return connect(mapStateToPropsRedirect)(RedirectComponent)
}