import React from "react"
import css from "./Profile.module.css"
import Post from "./Post"
import ProfileInfo from "./ProfileInfo";

const ProfilePage = (props) => {
    console.log('Step 5: ProfilePage')

    let posts = props.posts

    // debugger
    let allPosts = posts.map( post => <Post post={post} key={post.id}/>)

    if (props.profile) {

        return (<div>
                <div className={css.profileInfo}>
                    <ProfileInfo {...props}/>
                </div>
                <div className={css.posts}>
                    {allPosts}
                </div>
            </div>

        )
    }
}


export default ProfilePage