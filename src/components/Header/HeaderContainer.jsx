import React from "react"
import Header from "./Header";
import {connect} from "react-redux";
import {setAuthData} from "../../redux/authReducer";

class HeaderContainer extends React.Component {

    //after render
    componentDidMount() {
        console.log('componentDidMount')
        console.log(this.props)
        this.props.setAuthData()
    }

    render() {
        return (
            <Header data={this.props}/>
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


export default connect (mapStateToProps, {setAuthData})(HeaderContainer)


