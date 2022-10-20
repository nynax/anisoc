import React from "react"
import photo from "../../../images/dart.png";
import css from "./Profile.module.css"

const Post = React.memo((props) => {

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