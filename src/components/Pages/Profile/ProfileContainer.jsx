import React from "react";
import {addPost, getStatus, setCurrentProfile, setProfile, setStatus, updateArea} from "../../../redux/profileReducer";
import Posts from "./Posts";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component{

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
        console.log('Step 4 PostsContainer > render()')
        return <Posts {...this.props} />
    }
}

const mapStateToProps = (state) => {
    console.log('Step 2: mapStateToProps')
    console.log(state.pageProfile)
    return {
        posts: state.pageProfile.posts,
        postTextarea: state.pageProfile.postTextarea,
        profile: state.pageProfile.profile,
        myUserId: state.auth.data.id,
        isAuth: state.auth.isAuth,
        status: state.pageProfile.status
    }
}

export default compose(

    connect(mapStateToProps, {
        addPost,
        updateArea,
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