import React, {useState} from 'react';
import {ErrorMessage, Field} from "formik";
import TextError from "./TextError";
import Input from "./Input";
import axios from "axios";
import {message} from "antd";

function File(props) {
    const [ filename, setFileName ] = useState("");
    const [ filepath, setFilepath ] = useState("");
    const [ duration, setDuration ] = useState(0);
    const [ thumbnailPath, setThumbnailPath ] = useState("");


    const { label, name, values, ...rest } = props
    const onDrop =(value) => {

        let formData =new FormData;
        formData.append("file", value.target.files[0]);

        axios.post('/api/upload/server/video',
            formData,
            {headers: {'content-type' : 'multipart/form-data; charset=UTF-8'}})
            .then(response => {
                if(response.data.success) {
                    setFileName(response.data.filename)
                    let thumbnailData = {
                        filename: response.data.filename,
                        filepath: response.data.filepath
                    }

                    axios.post('/api/upload/server/thumbnail',
                        JSON.stringify(thumbnailData),
                        {headers:{'content-type':'application/json; charset=UTF-8'}})
                        .then(response => {
                            if(response.data.success) {
                                setFilepath(response.data.filepath)
                                setDuration(response.data.duration)
                                setThumbnailPath(response.data.thumbnailPath)
                                props.changeValue(response.data.filename, response.data.filepath, response.data.duration, response.data.thumbnailPath)
                            } else {
                                message.error('썸네일 생성에 실패했습니다');
                            }
                        })
                } else {
                    message.error('동영상을 서버에 저장하는데 실패했습니다');
                }
            })
    }

    return (
        <div className='form-control'>
            <label htmlFor={name}>{label}</label>
            <Field
                type="file"
                id={name} name={name} {...rest}
                onChange={onDrop}/>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    );
}


export default File;