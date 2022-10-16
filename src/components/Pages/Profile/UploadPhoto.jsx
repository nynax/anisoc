import css from "./Profile.module.css";
import React from "react";
import {useForm} from "react-hook-form";

const UploadPhoto = (props) => {
    console.log('AddPost')

    const {register, handleSubmit, reset, formState: {errors}} = useForm()



    return (
        <div>
           <form className={css.formInline} onSubmit={handleSubmit((data) => {
                //console.log(data)
                props.updatePhoto(data.photo)
                reset() //clear form
            })}>
                <input type="file" {...register("photo", {
                    required: "Select file please"
                })} />
                <button>Upload</button>

            </form>

            {/*<input type={"file"} onChange={handleSubmit((data) => {
                console.log(data)
                props.updatePhoto(data.photo)
                reset() //clear form
            })} {...register("photo", {
                required: "Select file please"
            })} />*/}

            <div className={css.errors}>
                {errors.photo !== undefined && <div>{errors.photo.message}</div>}
            </div>
        </div>
    )
}

export default UploadPhoto