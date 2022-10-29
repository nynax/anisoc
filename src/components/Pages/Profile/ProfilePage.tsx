import React, {FC} from "react"
import css from "./Profile.module.css"
import Post from "./Post"
import ProfileInfo from "./ProfileInfo";
import {AllProfileContainerType} from "./ProfileContainer";

const ProfilePage : FC<AllProfileContainerType> = (props) => {
    console.log('ProfilePage')

    //generate posts via map
    let allPosts = props.posts.map( post => <Post post={post} key={post.id} photo={props.profile != null && props.profile.photos.small ? props.profile.photos.small : null} likes={post.likes}/>)

    //has profile, show him
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
    return <></>

}


export default ProfilePage