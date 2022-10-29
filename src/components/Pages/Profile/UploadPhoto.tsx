import css from "./Profile.module.css";
import React, {FC} from "react";
import {useForm} from "react-hook-form";
import {UpdatePhotoType} from "../../../redux/profileReducer";
import {PhotoType} from "../../../types/types";

type UploadPhotoType = {
    updatePhoto: UpdatePhotoType
}

type FormValuesType = {
    photo: PhotoType
}

const UploadPhoto : FC<UploadPhotoType> = (props) => {
    console.log('UploadPhoto')

    const {register, handleSubmit, reset, formState: {errors}} = useForm<FormValuesType>()

    //render upload file form
    return (
        <div>
           <form className={css.formInline} onSubmit={handleSubmit((data) => {
                //upload photo and reset form data
                props.updatePhoto(data.photo)
                reset()
            })}>
                <input type="file" {...register("photo", {
                    required: "Select file please"
                })} />

               <button>Upload</button>

            </form>

            {/*show errors if have*/}
            <div className={css.errors}>
                {errors.photo !== undefined && <div>{errors.photo.message}</div>}
            </div>
        </div>
    )
}

export default UploadPhoto