import React from "react";
import preloader from "../../../avatars/Running_dog.gif";

const Preloader = (props) => {
    return <div>{props.showPreloader ? <img src={preloader} alt='bla bla bla'/> : null}</div>
}

export default Preloader