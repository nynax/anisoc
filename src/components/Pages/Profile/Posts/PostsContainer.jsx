import React from "react";
import {addPost, setCurrentProfile, setProfile, updateArea} from "../../../../redux/profileReducer";
import Posts from "./Posts";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";


class PostsContainer extends React.Component{

    //after render
    componentDidMount() {
        console.log('componentDidMount')
        console.log(this.props)
        this.props.data.setProfile(this.props.userId)

    }
    //when close
    componentWillUnmount(){
        this.props.data.setCurrentProfile(null)
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
            console.log('Page was changed...')
            this.props.data.setProfile(this.props.userId)
        }
    }

    updateArea = (value) => {
        this.props.data.updateArea(value)
    }

    addPost = () => {
        this.props.data.addPost()
    }

    render() {
        console.log('Step 4 PostsContainer > render()')
        return <Posts myUserId={this.props.data.myUserId}
                      posts={this.props.data.posts}
                      profile={this.props.data.profile}
                      postTextarea={this.props.data.postTextarea}
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
    }
}

const WithRouterComponent = (props) => {

    const params = useParams()

    console.log('Step 3: WithRouterComponent')
    console.log(props)
    console.log(params)

    if (params.userId){
        console.log('userId is set ' + params.userId)
    }else{
        console.log('userId is not set')
    }

    //for what?
    //let newProps = produce(props, draft => {
     //   draft = props
    //})

    return (
        <PostsContainer
            data={props} // Пропсы из mapStateToProps, {setUserProfile}
            userId={params.userId ? params.userId : props.myUserId} // Если userId нету, то отобразить myUserId
        />
    )
}



//Передаем в connect текущий state и массив с ActionCreate функциями в dispatch и функциональную компонету WithRouterComponent
export default connect(mapStateToProps, {
    addPost,
    updateArea,
    setCurrentProfile,
    setProfile
})(WithRouterComponent)