import css from "./Profile.module.css";
import StatusUpdate from "./StatusUpdate";
import React from "react";
import {NavLink} from "react-router-dom";
import photo from "../../../avatars/dart.png";
import AddPost from "./AddPost";
import UploadPhoto from "./UploadPhoto";

const ProfileOwner = (props) => {
    console.log('ProfileOwner')

    return (
        <div>
            <div className={css.profileInfo}>
                <div className={css.status}><NavLink to={'/profile/25964'}>&lt;&lt;</NavLink>&emsp;&emsp;&emsp;&ensp;
                    <NavLink to={'/profile/26002'}>&gt;&gt;</NavLink></div>
                <div className={css.dashboard}>
                    <div className={css.photo}>
                        <img src={props.profile.photos.large ? props.profile.photos.large : photo} alt='ohuenno'/>

                    </div>
                    <div>
                        <div className={css.fullName}>{props.profile.fullName}</div>
                        <div className={css.aboutMe}>{props.profile.aboutMe}</div>
                        <div className={css.status}>
                            <StatusUpdate status={props.status} setStatus={props.setStatus}/>
                        </div>
                    </div>

                </div>

                <UploadPhoto {...props}/>


                <div className={css.addPost}>
                    <AddPost addPost={props.addPost}/>
                </div>

            </div>
            <div className={css.profileContacts}>
                <div className={css.contacts}>hello</div>
            </div>
        </div>

    )
}

export default ProfileOwner