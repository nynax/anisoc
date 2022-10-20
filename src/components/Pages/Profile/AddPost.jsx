import css from "./Profile.module.css";
import React from "react";
import {useForm} from "react-hook-form";

const AddPost = (props) => {
    console.log('AddPost')

    const {register, handleSubmit, reset, formState: {errors}} = useForm()

    //render add post form
    return (
        <div>
            <form className={css.formInline} onSubmit={handleSubmit((data) => {
                //add post and clear form
                props.addPost(data.postMsg)
                reset() //clear form
            })}>
                <textarea {...register("postMsg", {
                    required: "Cant be empty"
                })} cols='30' placeholder='Type any message here...'/>
                <button>Send</button>

            </form>
            {/*show errors if have*/}
            <div className={css.errors}>
                {errors.postMsg !== undefined && <div>{errors.postMsg.message}</div>}
            </div>
        </div>
    )
}

export default AddPost