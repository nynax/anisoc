import React, { useState } from "react";

const StatusUpdate = (props) => {
    console.log('StatusUpdate')
    console.log(props)

    const [editMode, setEditMode] = useState(false);
    const [textStatus, setTextStatus] = useState(props.status);

    let onUpdateStatus = (e) => {
        let value = e.target.value
        setTextStatus(value)
    }

    return (
    <>
        {editMode
            ? <div><input autoFocus={true} onChange={onUpdateStatus} onBlur={() => {
                setEditMode(false)
                props.setStatus(textStatus)
            }} value={textStatus}></input></div>
            : <div onClick={() => setEditMode(true)}>{textStatus}</div>
        }
    </>
    )
}

export default StatusUpdate