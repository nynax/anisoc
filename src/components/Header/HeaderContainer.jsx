import React from "react"
import Header from "./Header";
import {connect} from "react-redux";
import {logout, setAuthData} from "../../redux/authReducer";

class HeaderContainer extends React.Component {

    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        auth:state.auth.data,
        isAuth:state.auth.isAuth
    }
}


export default connect (mapStateToProps, {setAuthData, logout})(HeaderContainer)


