import React, {FC} from "react"
import css from "../Dialogs.module.css"

type MessagesType = {
    ts: string
    msg: string
}

const Messages: FC<MessagesType>  = (props) => {
    return (
            <div className={css.msg}>
                <div>{`${props.ts} > ${props.msg}`}</div>
            </div>
    )
}


export default Messages