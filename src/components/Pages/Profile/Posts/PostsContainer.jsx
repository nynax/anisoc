import React from "react";
import {addPost, setCurrentProfile, setProfile, updateArea} from "../../../../redux/profileReducer";
import Posts from "./Posts";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../../../hoc/withAuthRedirect";


class PostsContainer extends React.Component{

    //after render
    componentDidMount() {
        console.log('componentDidMount')
        console.log(this.props)
        this.props.setProfile(this.props.pageNumber)

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

        if (this.props.pageNumber !== prevProps.pageNumber)
        {
            console.log('Page was changed...')
            this.props.setProfile(this.props.pageNumber)
        }
    }

    updateArea = (value) => {
        this.props.updateArea(value)
    }

    addPost = () => {
        this.props.addPost()
    }

    render() {
        console.log('Step 4 PostsContainer > render()')
        return <Posts myUserId={this.props.myUserId}
                      posts={this.props.posts}
                      profile={this.props.profile}
                      postTextarea={this.props.postTextarea}
                      updateArea={this.updateArea}
                      addPost={this.addPost}
                      />
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
        isAuth: state.auth.isAuth
    }
}

export default withAuthRedirect(connect(mapStateToProps, {
    addPost,
    updateArea,
    setCurrentProfile,
    setProfile
})(PostsContainer))


//Передаем в connect текущий state и массив с ActionCreate функциями в dispatch и функциональную компонету WithRouterComponent
// export default connect(mapStateToProps, {
//     addPost,
//     updateArea,
//     setCurrentProfile,
//     setProfile
// })(AuthRedirectComponent)