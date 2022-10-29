import React, {FC} from "react"
import photo from "../../../images/dart.png";
import css from "./Profile.module.css"
import {PostsType} from "../../../types/types";

type PostType = {
    photo: string | null
    likes: number
    post: PostsType
}

const Post : FC<PostType> = React.memo((props) => {

    //render post
    return (
        <div className={css.post}>
            <div className={css.avatar}>
                <img alt='mini avatar' src={props.photo ? props.photo : photo}/>
                <div className={css.like}>{props.likes}</div>
            </div>
            <div className={css.text}>{props.post.msg}</div>
        </div>
    )
})

export default Post