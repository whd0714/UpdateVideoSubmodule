import React, { useState } from 'react';
import {withRouter} from 'react-router-dom'
import { CloseOutlined } from '@ant-design/icons';
import { Tooltip, Typography, Divider } from 'antd';
import './VideoUploadCss.css';
import { Formik, Form } from 'formik';
import FormikControl from '../../Formik/FormikControl';
import { message } from 'antd';
import * as Yup from 'yup';
import Dropzone, {useDropzone} from 'react-dropzone';
import {PlusOutlined} from '@ant-design/icons';
import axios from "axios";
import Input from "../../Formik/Input";
import {useSelector} from "react-redux";

const { Title } = Typography;

function VideoUploadPage(props) {

    const user = useSelector(state => state.user);

    const [ filename, setFileName ] = useState("");
    const [ filepath, setFilepath ] = useState("");
    const [ duration, setDuration ] = useState(0);
    const [ thumbnailPath, setThumbnailPath ] = useState("");

    const changeValue = (filename, filepath, duration, thumbnailPath) => {
        setFileName(filename)
        setFilepath(filepath)
        setDuration(duration)
        setThumbnailPath(thumbnailPath)
    }

    const initialValues = {
        file: null,
        title: '',
        description: '',
        category: '',
        access: '',
    }

    const categoryOptions = [
        {key:'카테고리를 선택해주세요', value: ''},
        {key: 'MUSIC', value: 'MUSIC'},
        {key: 'SPORTS', value: 'SPORTS'},
        {key: 'GAME', value: 'GAME'},
    ]

    const accessOptions = [
        {key:'공개 여부를 선택해주세요', value: ''},
        {key: 'PRIVATE', value: 'PRIVATE'},
        {key: 'PUBLIC', value: 'PUBLIC'},
    ]

    const onSubmit = values => {

        let videoData = {
            filename: filename,
            filepath: filepath,
            duration: duration,
            thumbnailPath: thumbnailPath,
            memberId: user.auth.data.memberId,
            title: values.title,
            description: values.description,
            access: values.access,
            category: values.category
        }

        axios.post("/api/video/upload",
            JSON.stringify(videoData),
            {headers:{'content-type' : 'application/json; charset=UTF-8'}})
            .then(response=> {
                if(response.data.success) {
                    message.success('동영상을 등록했습니다.')
                    setTimeout(()=> {
                        window.location.reload();
                    },500)
                } else {
                    message.error('동영상을 등록하는데 실패했습니다.')
                }
            })

    }

    const validationSchema = Yup.object({
        //file: Yup.mixed().required('동영상은 필수입니다'),
        title: Yup.string().required('필수 정보입니다.'),
        description: Yup.string().required('필수 정보입니다.'),
        category: Yup.string().required('필수 정보입니다.'),
        access: Yup.string().required('필수 정보입니다.')
    })

    const onHandCloseHandler = () => {

        props.modalHandler(props.modelState)
    }

    return (
        <div style={{position:'fixed',width:'100%', height:'100%', zIndex:'1', top:'0', left:0, display:'flex', justifyItems:'center', alignItems:'center',
            backgroundColor:'white', justifyContent:'center', boxShadow:'0 2px 7px rgba(0,0,0,0.5)', background:'rgba(0, 0, 0, 0.7)'}}>
            alignContent
           <div style={{position:'absolute', background:'white', width:'80%'}}>
               <div className="closeBox" style={{padding:'15px 15px 0 0', float:'right', fontSize:'20px', zIndex:'10000'}}>
                   <Tooltip placement='bottom' title='닫기' zIndex='2' arrowPointAtCenter>
                       <CloseOutlined onClick={onHandCloseHandler} className="closeBtn"/>
                   </Tooltip>
               </div>
               <Title style={{padding:'0 0 0 15px', margin:'0', display:'inline-block',
                   alignSelf:'center', width:'100%'}} level={3}>
                   동영상 업로드
               </Title>
               <Divider></Divider>
               <div style={{display:'inline-block'}}>
                   <div style={{display: 'flex', padding:'1rem 12rem'}}>
                       <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}
                       >
                           {
                               formik => {
                                   return <div>
                                       <Form>
                                           <div>
                                               <FormikControl
                                                   changeValue={changeValue}
                                                   control='file'
                                                   type='file'
                                                   label='File'
                                                   name='file'
                                               />
                                               {/*<Input
                                                   type="file"
                                                   name='file1'
                                                   onChange={onDrop}/>*/}
                                               <FormikControl
                                                    control='input'
                                                    type='input'
                                                    label='Title'
                                                    name='title'
                                               />
                                               <FormikControl
                                                   control='input'
                                                   type='textarea'
                                                   label='Description'
                                                   name='description'
                                               />
                                               <FormikControl
                                                    control='select'
                                                    label='Category'
                                                    name='category'
                                                    options={categoryOptions}
                                               />
                                               <FormikControl
                                                   control='select'
                                                   label='Access'
                                                   name='access'
                                                   options={accessOptions}
                                               />

                                               {/*<button type='submit' disabled={!formik.isValid}>동영상등록</button>*/}
                                               <button type='submit'>동영상등록</button>

                                           </div>
                                       </Form>
                                   </div>
                               }
                           }
                       </Formik>
                   </div>
               </div>
               <div style={{display:'inline-block'}}>
                   {/*Thumbnail area*/}
                   {thumbnailPath &&
                   <img src={`http://localhost:8080/${thumbnailPath}`}
                        style={{width:'360px', height:'288px',position:'absolute'}} alt=""/>
                   }
               </div>
           </div>
        </div>
    );
}

export default withRouter(VideoUploadPage);