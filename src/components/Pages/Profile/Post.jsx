import React from "react"
import photo from "../../../avatars/dart.png";
import css from "./Profile.module.css"

const Post = (props) => {
    return (
        <div className={css.post}>
            <div className={css.avatar}>
                <img alt='oxuenno ochen' src={photo}/>
                <div className={css.like}>{props.likes}</div>
            </div>
            <div className={css.text}>{props.post.msg}</div>
        </div>
    )
}


export default Post