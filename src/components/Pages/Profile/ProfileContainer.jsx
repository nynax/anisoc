import React, {useEffect} from "react";
import {addPost, getStatus, setCurrentProfile, setProfile, setStatus, updatePhoto} from "../../../redux/profileReducer";
import ProfilePage from "./ProfilePage";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getAuthData, getIsAuth} from "../../../redux/authSelector";
import {getPageProfilePosts, getPageProfileProfile, getPageProfileStatus} from "../../../redux/profileSelector";
import {getShowPreloader} from "../../../redux/usersSelector";



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
        return <ProfilePage {...props} />
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
        getStatus,
        updatePhoto
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