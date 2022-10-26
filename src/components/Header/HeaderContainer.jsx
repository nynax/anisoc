import React from "react"
import Header from "./Header";
import {connect} from "react-redux";
import {logoutMe, setAuthData} from "../../redux/authReducer";
import {getAuthData, getIsAuth} from "../../redux/authSelector";

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
        auth:getAuthData(state),
        isAuth:getIsAuth(state)
    }
}


export default connect (mapStateToProps, {setAuthData, logoutMe})(HeaderContainer)


