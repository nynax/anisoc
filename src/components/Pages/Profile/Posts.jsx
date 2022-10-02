import React from "react"
import css from "./Profile.module.css"
import Post from "./Post"
import photo from "../../../avatars/dart.png";
import {NavLink} from "react-router-dom";
import StatusUpdate from "./StatusUpdate";

const Posts = (props) => {
    console.log('Step 5: Posts')
    console.log(props)
    //console.log(props)



    console.log(props.profile)

    let posts = props.posts
    let postTextarea = props.postTextarea

    //let onAddPost = () => {
    //    props.addPost()
    //}
    let onUpdateArea = (e) => {
         let value = e.target.value
         props.updateArea(value)
     }
    // debugger
    let allPosts = posts.map( post => <Post post={post} key={post.id}/>)

    if (props.profile) {
        return (<>

                <div><NavLink to={'/profile/25964'}>Other Profile</NavLink></div>
                <div><NavLink to={'/profile/26002'}>more Profile</NavLink></div>
                <div className={css.dashboard}>
                    <div className={css.photo}><img
                        src={props.profile.photos.large ? props.profile.photos.large : photo} alt='ohuenno'/></div>
                    <div>
                        <div className={css.fullName}>{props.profile.fullName}</div>
                        <div className={css.aboutMe}>{props.profile.aboutMe}</div>
                    </div>


                </div>
                {props.profile && props.profile.userId === props.myUserId &&
                    <div className={css.status}>
                        <StatusUpdate status={props.status} setStatus={props.setStatus}/>
                    </div>
                }
                <div className={css.posts}>
                    <div className={css.sendform}>
                        <div><textarea onChange={onUpdateArea} cols='30' placeholder='Type any message here...'
                                       value={postTextarea}/></div>
                        <div>
                            <button onClick={() => {
                                props.addPost()
                            }}>Send
                            </button>
                        </div>
                    </div>
                    <div className={css.allposts}>
                        {allPosts}
                    </div>
                </div>
            </>
        )
    }
}


export default Posts