import React, {useEffect, useState} from "react";
import editsvg from "../../../images/pencil.svg"
import css from "./Profile.module.css";

const UpdateInputOnClick = (props) => {
    console.log('StatusUpdate')
    console.log(props)
//debugger
    const [editMode, setEditMode] = useState(false);
    const [textInput, setTextInput] = useState(props.textValue);

    useEffect(() => {
        setTextInput(props.textValue)
    },[props.textValue]);


    let onUpdateStatus = (e) => {
        let value = e.target.value
        setTextInput(value)
    }

    const nameReplace = {
        lookingForAJobDescription: null,
        status: null,
        fullName: null,
        aboutMe: null
    }

    return (
    <>
        {editMode
            ? <div className={css.inputOnClick}><input autoFocus={true} onChange={onUpdateStatus} onBlur={() => {
                setEditMode(false)
                if (props.textValue !== textInput){
                    props.setValue(textInput, props.inputName)
                }
            }} value={textInput}></input></div>
            :
                <div className={css.inputOnClick} onClick={() => setEditMode(true)}>
                    <b>{nameReplace[props.inputName]}</b>
                    {textInput ? textInput : "touch me"}
                    &emsp;<object className={css.editsvg} type="image/svg+xml" data={editsvg} width="10" height="10">Your browser does not support SVG</object>
                </div>
        }
    </>
    )
}

export default UpdateInputOnClick