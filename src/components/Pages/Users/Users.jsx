import React from "react"
import css from "./Users.module.css"
import avatar from "../../../avatars/maul.png";
import {NavLink} from "react-router-dom";


let Users = (props) => {
    console.log(props)

    let pagesCount = Math.ceil(props.totalUsers / props.usersPerPage)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div className={css.users}>
        {
            pages.map((pn) => {
                return <span key={pn} className={pn === props.currentPage ? css.selectedPage : css.page}
                             onClick={() => props.changePage(pn)}> {pn} </span>
            })

        }
        <div className={css.text}>{
            props.users.map(user => {

                let followInProgress = props.followInProgress.some( userId => userId === user.id )

                return <div className={css.user} key={user.id}>
                    <div className={css.avatar}>
                        <NavLink to={/profile/ + user.id}><img alt='oxuenno ochen' src={user.photos.small ? user.photos.small : avatar}/></NavLink>
                        {user.followed
                            ? <button disabled={followInProgress} onClick={() => {
                                props.followAndUnfollow(false, user.id)
                            }}>Unfollow</button>
                            : <button disabled={followInProgress} onClick={() => {
                                props.followAndUnfollow(true, user.id)
                            }}>Follow</button>
                        }
                    </div>
                    <div className={css.name}>{user.name}
                        <div className={css.status}>{user.status}</div>
                    </div>

                </div>
            })}</div>
    </div>
}


export default Users