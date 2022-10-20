import React from "react"
import css from "./Profile.module.css"
import Post from "./Post"
import ProfileInfo from "./ProfileInfo";

const ProfilePage = (props) => {
    console.log('ProfilePage')

    //generate posts via map
    let allPosts = props.posts.map( post => <Post post={post} key={post.id} photo={props.profile != null && props.profile.photos.small ? props.profile.photos.small : null}/>)

    //if has profile, show im
    if (props.profile) {
        return (<div className={css.profilePage}>
                <div>
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