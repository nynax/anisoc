import css from "./Profile.module.css";
import React from "react";
import {useForm} from "react-hook-form";

const AddPost = (props) => {
    console.log('AddPost')

    const {register, handleSubmit, reset, formState: {errors}} = useForm()


    return (
        <div>
            <form className={css.formInline} onSubmit={handleSubmit((data) => {
                //console.log(data)
                props.addPost(data.postMsg)
                reset() //clear form
            })}>
                <textarea {...register("postMsg", {
                    required: "Cant be empty"
                })} cols='30' placeholder='Type any message here...'/>
                <button>Send</button>

            </form>

            <div className={css.errors}>
                {errors.postMsg !== undefined && <div>{errors.postMsg.message}</div>}
            </div>
        </div>
    )
}

export default AddPost