import React from "react"
import css from "./Profile.module.css"
import Post from "./Post"
import photo from "../../../avatars/dart.png";
import {NavLink} from "react-router-dom";
import StatusUpdate from "./StatusUpdate";
import {useForm} from "react-hook-form";

const Posts = (props) => {
    console.log('Step 5: Posts')
    console.log(props)
    //console.log(props)



    console.log(props.profile)

    let posts = props.posts

    // debugger
    let allPosts = posts.map( post => <Post post={post} key={post.id}/>)

    if (props.profile) {

        const { register, handleSubmit, formState: { errors } } = useForm()

        return (<>

                <div className={css.status}><NavLink to={'/profile/25964'}>&lt;&lt;</NavLink>&emsp;&emsp;&emsp;&ensp;
                    <NavLink to={'/profile/26002'}>&gt;&gt;</NavLink></div>
                <div className={css.dashboard}>
                    <div className={css.photo}><img
                        src={props.profile.photos.large ? props.profile.photos.large : photo} alt='ohuenno'/></div>
                    <div>
                        <div className={css.fullName}>{props.profile.fullName}</div>
                        <div className={css.aboutMe}>{props.profile.aboutMe}</div>
                    </div>


                </div>
                {/* If owner profile, show status change and send post */}
                {props.profile && props.profile.userId === props.myUserId &&
                    <div>
                        <div className={css.status}>
                            <StatusUpdate status={props.status} setStatus={props.setStatus}/>
                        </div>
                        <form className={css.formInline} onSubmit={handleSubmit ((data) => {
                            console.log(data)
                            props.addPost(data.postMsg)


                        })}>
                            <textarea {...register("postMsg", {
                                required: "Cant be empty"})} cols='30' placeholder='Type any message here...' />
                            <button>Send</button>

                        </form>
                        <div className={css.errors}>
                            {errors.postMsg !== undefined && <div>{errors.postMsg.message}</div>}
                        </div>
                    </div>
                }
                <div className={css.posts}>

                    <div className={css.allposts}>
                        {allPosts}
                    </div>
                </div>
            </>

        )
    }
}


export default Posts