import React, {useEffect, useState} from "react";

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

    return (
    <>
        {editMode
            ? <div><input autoFocus={true} onChange={onUpdateStatus} onBlur={() => {
                setEditMode(false)
                props.setStatus(textInput, "status")
            }} value={textInput} placeholder={'set status...'}></input></div>
            : <div onClick={() => setEditMode(true)}>{textInput}</div>
        }
    </>
    )
}

export default UpdateInputOnClick