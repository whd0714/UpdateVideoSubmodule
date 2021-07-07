import React from 'react';
import { withRouter } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from "../Formik/FormikControl";
import { useDispatch } from "react-redux";
import {userLogin} from "../../../_actions/user_action";

function LoginPage(props) {

    const dispatch = useDispatch();

    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('이메일 주소를 다시 확인해주세요.').required('필수 정보입니다.'),
        password: Yup.string().required('필수 정보입니다.')
    })

    const onSubmit = values => {
        dispatch(userLogin(values))
            .then(response=>{
                console.log(response)
            })
    }
    return (
        <div style={{display: 'inline-block', position: 'absolute', borderTop: '1px solid #ddd', width: '100%'}}>
            <div style={{display: 'flex', justifyContent:'space-evenly', marginTop:'20px', width: '90%'}}>
               <Formik
                   initialValues={initialValues}
                   validationSchema={validationSchema}
                   onSubmit={onSubmit}
               >
                   {
                       formik => {
                           return <Form>
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
                               <button type='submit' disabled={!formik.isValid}>로그인</button>
                           </Form>
                       }
                   }
               </Formik>
           </div>
        </div>
    );
}

export default withRouter(LoginPage);