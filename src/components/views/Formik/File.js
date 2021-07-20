import React from 'react';
import {ErrorMessage, Field} from "formik";
import TextError from "./TextError";
import {useDropzone} from "react-dropzone";
import axios from "axios";
import Dropzone from "dropzone";
import {PlusOutlined} from '@ant-design/icons';
const onDrop =(files) => {
    console.log("!!!!!!!!!!!!!!!!!11")
    let formData =new FormData;
    formData.append("file", files[0]);

    axios.post('/api/upload/server/video',
        formData,
        {headers: {'content-type' : 'multipart/form-data; charset=UTF-8'}})
        .then(response => {
            console.log(response)
        })
}

function File(props) {
    const { label, name, values, ...rest } = props
    return (
        <div className='form-control'>
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name} onChange={(e)=> values.setFieldValue('file111', e.target)} {...rest}/>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    );
}


export default File;