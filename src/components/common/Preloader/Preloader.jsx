import React from "react";
import preloader from "../../../images/Running_dog.gif";

const Preloader = (props) => {
    return <div>{props.showPreloader ? <img src={preloader} alt='running dog'/> : null}</div>
}

export default Preloader