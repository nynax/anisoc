import React, {useEffect} from "react";
import {addPost, getStatus, setCurrentProfile, setProfile, setStatus} from "../../../redux/profileReducer";
import Posts from "./Posts";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getAuthData, getIsAuth} from "../../../redux/authSelector";
import {getPageProfilePosts, getPageProfileProfile, getPageProfileStatus} from "../../../redux/profileSelector";
import {getShowPreloader} from "../../../redux/usersSelector";


/*class ProfileContainerOld extends React.Component{

    //after render
    componentDidMount() {
        console.log('componentDidMount')
        console.log(this.props)

        let userId = this.props.userId ? this.props.userId : this.props.myUserId

        this.props.setProfile(userId)
        this.props.getStatus(userId)

    }
    //when close
    componentWillUnmount(){
        this.props.setCurrentProfile(null)
        console.log('componentWillUnmount')
        console.log(this.props.data)
    }
    //if props changed
    componentDidUpdate(prevProps) {
        console.log('componentDidUpdate')
        console.log(prevProps)
        console.log(this.props)

        if (this.props.userId !== prevProps.userId)
        {
            console.log('========')
            console.log(this.props)
            console.log(this.props.userId)
            console.log(this.props.myUserId)
            if (this.props.userId) {
                console.log('true')
                this.props.setProfile(this.props.userId)
            }else{
                console.log('false')
                this.props.setProfile(this.props.myUserId)
            }
            console.log('Page was changed...')
        }
    }

    render() {
        console.log('Step 4 PostsContainerOld > render()')
        return <Posts {...this.props} />
    }
}*/

const ProfileContainer = (props) => {
    //props.setProfile(null)
    useEffect(() => {
        let userId = props.userId ? props.userId : props.myUserId
        props.setProfile(userId)
        props.getStatus(userId)
    },[props.userId]);

    console.log('Step 4 PostsContainer > return')
    //console.log(props)
    if (!props.showPreloader){
        return <Posts {...props} />
    }

}

const mapStateToProps = (state) => {
    console.log('Step 2: mapStateToProps')
    //console.log(state.pageProfile)
    return {
        posts: getPageProfilePosts(state),
        profile: getPageProfileProfile(state),
        myUserId: getAuthData(state).id,
        isAuth: getIsAuth(state),
        status: getPageProfileStatus(state),
        showPreloader: getShowPreloader(state)
    }
}

export default compose(
    connect(mapStateToProps, {
        addPost,
        setCurrentProfile,
        setProfile,
        setStatus,
        getStatus
    }),
    withAuthRedirect
)(ProfileContainer)


/*export default withAuthRedirect(connect(mapStateToProps, {
    addPost,
    updateArea,
    setCurrentProfile,
    setProfile
})(PostsContainer))*/


//Передаем в connect текущий state и массив с ActionCreate функциями в dispatch и функциональную компонету WithRouterComponent
// export default connect(mapStateToProps, {
//     addPost,
//     updateArea,
//     setCurrentProfile,
//     setProfile
// })(AuthRedirectComponent)