import React from 'react';
import {withRouter} from 'react-router-dom'
import { CloseOutlined } from '@ant-design/icons';
import { Tooltip, Typography, Divider } from 'antd';
import './VideoUploadCss.css';
import { Formik, Form } from 'formik';
import FormikControl from '../../Formik/FormikControl';
import { message } from 'antd';
import * as Yup from 'yup';
import Dropzone from 'react-dropzone';
import {PlusOutlined} from '@ant-design/icons';
import axios from "axios";

const { Title } = Typography;

function VideoUploadPage(props) {

    const initialValues = {
        file: [],
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

    const onDrop =(files) => {
        let formData =new FormData;
        formData.append("file", files[0]);

        axios.post('/api/upload/server/video',
            formData,
            {headers: {'content-type' : 'multipart/form-data; charset=UTF-8'}})
            .then(response => {
                console.log(response)
            })
    }

    return (
        <div style={{position:'fixed',width:'100%', height:'100%', zIndex:'1', top:'0', left:0, display:'flex', justifyItems:'center', alignItems:'center',
            backgroundColor:'white', justifyContent:'center', boxShadow:'0 2px 7px rgba(0,0,0,0.5)', background:'rgba(0, 0, 0, 0.7)'}}>
            alignContent
           <div style={{position:'absolute', background:'white', width:'80%'}}>
               <div className="closeBox" style={{padding:'15px 15px', float:'right', fontSize:'20px', zIndex:'10000'}}>
                   <Tooltip placement='bottom' title='닫기' zIndex='2' arrowPointAtCenter>
                       <CloseOutlined onClick={onHandCloseHandler} className="closeBtn"/>
                   </Tooltip>
               </div>


               <div>
                   <Title style={{padding:'20px 0 0 15px', margin:'0', display:'inline-block', alignSelf:'center'}} level={3}>동영상 업로드</Title>

                    <Divider></Divider>

                   <div style={{display: 'flex', padding:'1rem 15rem'}}>
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
                                          </div>
                                           <div>
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

           </div>
        </div>
    );
}

export default withRouter(VideoUploadPage);