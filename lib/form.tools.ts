import {FieldValues, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ObjectSchema} from "yup";

export const textRegex = /^[a-zA-Z\s]+$/;
export const mailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
export function setFormControl(formSchema:  ObjectSchema<FieldValues, AnyObject, any, "">) {
    return useForm({
        resolver: yupResolver(formSchema)
    })
}
export default { textRegex, mailRegex, setFormControl };