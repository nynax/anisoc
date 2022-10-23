import React, {useEffect, useState} from "react";
import editsvg from "../../../images/svg/pencil.svg"
import css from "./Profile.module.css";

const UpdateInputOnClick = (props) => {
    console.log('UpdateInputOnClick')

    const [editMode, setEditMode] = useState(false);
    const [textInput, setTextInput] = useState(props.textValue);

    //if props changed, update local state for textInput
    useEffect(() => {
        setTextInput(props.textValue)
    },[props.textValue]);

    //save local state if value any change
    let onUpdateStatus = (e) => {
        let value = e.target.value
        setTextInput(value)
    }

    //render input
    return (
    <>
        {editMode
            ? <div className={css.inputOnClick}><input autoFocus={true} onChange={onUpdateStatus} onBlur={() => {
                //disable input and update global state if data was changed
                setEditMode(false)
                if (props.textValue !== textInput){
                    props.setValue(textInput, props.inputName)
                }
            }} value={textInput}></input></div>
            : <div className={css.inputOnClick} onClick={() => setEditMode(true)}>
                    {textInput ? textInput : "touch me"}
                    &emsp;<object className={css.editsvg} type="image/svg+xml" data={editsvg} width="10" height="10">Your browser does not support SVG</object>
             </div>
        }
    </>
    )
}

export default UpdateInputOnClick