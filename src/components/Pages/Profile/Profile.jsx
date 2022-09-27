import React from "react"
import css from "./Profile.module.css"
import PostsContainer from "./Posts/PostsContainer";



export const Profile = (props) => {

    return (
        <div className={css.profile}>
            <PostsContainer store={props.store} whoiam ='UserProfile'/>
        </div>
    )
}

