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

const { Title } = Typography;



function VideoUploadPage(props) {

    const [ filename, setFileName ] = useState("");
    const [ filepath, setFilepath ] = useState("");
    const [ duration, setDuration ] = useState(0);
    const [ thumbnailPath, setThumbnailPath ] = useState("");

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
        console.log(values);
    }

    const validationSchema = Yup.object({
        file: Yup.mixed().required('동영상은 필수입니다'),
        title: Yup.string().required('필수 정보입니다.'),
        description: Yup.string().required('필수 정보입니다.'),
        category: Yup.string().required('필수 정보입니다.'),
        access: Yup.string().required('필수 정보입니다.')
    })

    const onHandCloseHandler = () => {

        props.modalHandler(props.modelState)
    }

    const onDrop =(value) => {
        console.log(value.target.files[0])
        let formData =new FormData;
        formData.append("file", value.target.files[0]);

        axios.post('/api/upload/server/video',
            formData,
            {headers: {'content-type' : 'multipart/form-data; charset=UTF-8'}})
            .then(response => {
                if(response.data.success) {
                    setFileName(response.data.filename)

                    console.log(response.data.filename)
                    console.log(response.data.filepath)

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
                                         {/* <div>
                                              <Dropzone
                                                  onDrop={onDrop}
                                                  multiple={false}
                                                  maxSize={1000000000}
                                                  name="file"
                                              >
                                                  {({ getRootProps, getInputProps}) => (
                                                      <div style={{width:'300px', height:'240px',border:'1px solid #ddd',
                                                          justifyContent:'center', alignItems:'center', display:'flex'}} {...getRootProps()}>
                                                          <input {...getInputProps()}/>
                                                          <PlusOutlined style={{fontSize:'3rem'}}></PlusOutlined>
                                                      </div>
                                                  )}
                                              </Dropzone>
                                          </div>*/}

                                           <div>
                                               {/*<FormikControl
                                                   control='input'
                                                   type='file'
                                                   label='File'
                                                   name='file'
                                               />*/}
                                               <Input
                                                   type="file"
                                                   name='file1'
                                                   onChange={onDrop}/>
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

                                              {/* <button type='submit' disabled={!formik.isValid}>동영상등록</button>*/}
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