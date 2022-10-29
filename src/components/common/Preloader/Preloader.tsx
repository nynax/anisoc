import React, {FC} from "react";
import preloader from "../../../images/Running_dog.gif";

type PreloaderType = {
    showPreloader:boolean
}

const Preloader : FC<PreloaderType> = (props) => {
    return <div>{props.showPreloader ? <img src={preloader} alt='running dog'/> : null}</div>
}

export default Preloader