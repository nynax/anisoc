import css from "./Profile.module.css";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import facebook from "../../../images/svg/social-1_logo-facebook.svg"
import github from "../../../images/svg/social-1_logo-github.svg"
import instagram from "../../../images/svg/social-1_logo-instagram.svg"
import mainLink from "../../../images/svg/social-1_logo-linkedin.svg"
import twitter from "../../../images/svg/social-1_round-twitter.svg"
import vk from "../../../images/svg/social-1_square-reddit.svg"
import website from "../../../images/svg/social-1_logo-rss.svg"
import youtube from "../../../images/svg/social-1_logo-youtube.svg"
import { isEqual } from 'lodash';


const ProfileContacts = (props) => {
    console.log('ProfileContacts')

    const {register, handleSubmit} = useForm()
    const [editMode, setEditMode] = useState(false)
    const contactNames = Object.keys(props.contacts)
    const [contactsProfile, setContactsProfile] = useState(props.contacts);

    //update local state if props changed
    useEffect(() => {
        setContactsProfile(props.contacts)
    },[props.contacts]);

    //replace for icons before input
    const nameReplace = {
        facebook: facebook,
        github: github,
        instagram: instagram,
        mainLink: mainLink,
        twitter: twitter,
        vk: vk,
        website: website,
        youtube: youtube,
    }

    //create inputs for contact form
    let allContacts = contactNames.map ( contactName => (

        editMode ?  <div className={css.contactRow} key={contactName}>
                    <img className={css.contactLabel} alt='sn contact' src={nameReplace[contactName]}/>
                    <input {...register(contactName, { value: contactsProfile[contactName] })}/></div>
                 :  contactsProfile[contactName] ?  <div className={css.contactRow} key={contactName}>
                                                    <img className={css.contactLabel} alt='sn contact' src={nameReplace[contactName]}/>
                                                    <div className={css.contactValue}>
                                                    <a href={contactsProfile[contactName]} target="_blank" rel="noopener noreferrer">{contactsProfile[contactName]}</a></div></div>
                                                 :  null
    ))

    //render contact form if owner profile, else render read only
    return (<div>
            {props.isAuth ?
                <form className={css.formInline} onSubmit={handleSubmit((data) => {

                    // if edited and changed contacts, do dispatch
                    if (editMode && !isEqual(props.contacts, data)){
                        setContactsProfile(data)
                        props.setValue(data, 'contacts')
                    }
                    setEditMode(!editMode)
                })}>
                    {editMode ? <div><button>Save</button>
                                <input className={css.cancelButton} onClick={()=>{setEditMode(false)}} type="button" value="Cancel"/></div>
                              : <button>Edit</button>}
                    <div className={css.contactFieldsOwner}>{allContacts}</div>
                </form>
                : <div className={css.contactFields}>{allContacts}</div>
            }
            </div>
        )
}

export default ProfileContacts