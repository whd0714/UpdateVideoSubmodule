import React from 'react';
import { withRouter } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from "../Formik/FormikControl";
import { useDispatch } from "react-redux";
import {userRegister} from "../../../_actions/user_action";
import { message } from 'antd';

function RegisterPage(props) {

    const dispatch = useDispatch();

    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const onSubmit = values => {
        dispatch(userRegister(values))
            .then(response=> {
                if (response.payload.success) {
                    message.success('회원가입완료')
                    setTimeout((values)=>{
                        props.history.push('/')
                    },1000)
                } else {
                    message.error(response.payload.errorMessage)
                }
            })
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('필수 정보입니다.'),
        email: Yup.string()
            .email('이메일 주소를 다시 확인해주세요.')
            .required('필수 정보입니다.'),
        password: Yup.string().required('필수 정보입니다.'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], '비밀번호가 일치하지 않습니다').required('필수 정보입니다.')
    })

    return (
        <div style={{display: 'inline-block', position: 'absolute', borderTop: '1px solid #ddd',
            width: '100%'}}>
            <div style={{display: 'flex', justifyContent:'space-evenly', marginTop:'20px', width: '90%'}}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {
                        formik => {
                            return <div>
                                <div style={{textAlign:'center', fontWeight:'bold', fontSize:'20px', padding:'20px 0'}}>회원가입</div>
                                <Form>
                                    <FormikControl
                                        control='input'
                                        type='text'
                                        label='이름'
                                        name='name'
                                    />
                                    <FormikControl
                                        control='input'
                                        type='email'
                                        label='이메일'
                                        name='email'
                                    />
                                    <FormikControl
                                        control='input'
                                        type='password'
                                        label='비밀번호'
                                        name='password'
                                    />
                                    <FormikControl
                                        control='input'
                                        type='password'
                                        label='비밀번호 확인'
                                        name='confirmPassword'
                                    />
                                    <button type='submit' disabled={!formik.isValid}>가입하기</button>
                                </Form>
                            </div>
                        }
                    }
                </Formik>
            </div>
        </div>
    );
}

export default withRouter(RegisterPage);