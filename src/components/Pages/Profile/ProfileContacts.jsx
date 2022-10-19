import css from "./Profile.module.css";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import twitter from "../../../images/svg/social-1_round-twitter.svg"


const ProfileContacts = (props) => {
    console.log('ProfileContacts')

    const {register, handleSubmit} = useForm()
    const [editMode, setEditMode] = useState(false)
    const contactNames = Object.keys(props.contacts)

    const nameReplace = {
        facebook: twitter,
        github: twitter,
        instagram: twitter,
        mainLink: twitter,
        twitter: twitter,
        vk: twitter,
        website: twitter,
        youtube: twitter,
    }

    let allContacts = contactNames.map ( contactName => (

        editMode ? <div key={contactName}><img alt='sn contact' src={nameReplace[contactName]}/><input {...register(contactName)} /></div>
                 : props.contacts[contactName] ? <div key={contactName}><img alt='sn contact' src={nameReplace[contactName]}/><div>{props.contacts[contactName]}</div></div> : null

    ))

    return (<div>
            <form className={css.formInline} onSubmit={handleSubmit((data) => {
                setEditMode(!editMode)
                editMode ? console.log(data) : console.log('null')
            })}>
                <button>{editMode ? "Save" : "Edit"}</button>
                {allContacts}
            </form>
            </div>
        )
}

export default ProfileContacts