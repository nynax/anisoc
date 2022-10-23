import css from "./Profile.module.css";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {isEqual} from 'lodash';


const ProfileContacts = (props) => {
    console.log('ProfileContacts')
    //console.log(props)

    const {register, handleSubmit, formState: { errors  }} = useForm()


    const [editMode, setEditMode] = useState(false)
    const contactNames = Object.keys(props.contacts)
    const [contactsProfile, setContactsProfile] = useState(props.contacts);

    //update local state if props changed
    useEffect(() => {
        setContactsProfile(props.contacts)
    },[props.contacts]);

    useEffect(() => {
        props.profileError !== null && setEditMode(true)
    },[props.profileError]);


    //create single input for contact form
    let allContacts = contactNames.map ( contactName => (

        editMode ?  <div className={css.contactRow} key={contactName}>
                    <img className={css.contactLabel} alt='sn contact' src={require('../../../images/svg/' + contactName + '.svg')}/>
                        <input {...register(contactName,{value: contactsProfile[contactName],
                                                                    pattern: {
                                                                    value: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&/=]*)/,
                                                                    message: 'Incorrect site url' // JS only: <p>error message</p> TS only support string
                                                                }

                    })}/>

        </div>
                 :  contactsProfile[contactName] ?  <div className={css.contactRow} key={contactName}>
                                                    <img className={css.contactLabel} alt='sn contact' src={require('../../../images/svg/' + contactName + '.svg')}/>
                                                    <div className={css.contactValue}>
                                                    <a href={contactsProfile[contactName]} target="_blank" rel="noopener noreferrer">{contactsProfile[contactName]}</a></div></div>
                                                 :  null
    ))

    //render contact form if owner profile, else render read only
    return (<div>
            {props.isAuth ?
                <form className={css.formInline} onSubmit={handleSubmit((data) => {
                    console.log('edit set')
                    // if edited and changed contacts, do dispatch
                    if (editMode && !isEqual(props.contacts, data)){
                        setContactsProfile(data)
                        props.setValue(data, 'contacts')
                    }
                    //forever clear error in global state if submit
                    props.setProfileError(null)
                    setEditMode(!editMode)
                })}>
                    {editMode ? <div><button disabled={Object.keys(errors).length !== 0}>Save</button>
                                <input className={css.cancelButton} onClick={()=>{setEditMode(false)}} type="button" value="Cancel"/></div>
                              : <button>Edit</button>}
                    <div className={css.contactFieldsOwner}>{allContacts}</div>

                    {contactNames.map ( contactName => (
                            errors[contactName] !== undefined && <div  className={css.errors} key={contactName}>{errors[contactName]['message']}</div>
                        ))}
                    {props.profileError !== null && <div className={css.errors}>{props.profileError}</div>}
                </form>

                : <div className={css.contactFields}>{allContacts}</div>
            }
            </div>
        )
}

export default ProfileContacts