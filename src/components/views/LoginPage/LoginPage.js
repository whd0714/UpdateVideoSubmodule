import React from 'react';
import { withRouter } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from "../Formik/FormikControl";

function LoginPage(props) {
    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('옳바르지 않은 이메일 형식입니다').required('입력필수'),
        password: Yup.string().required('입력필수')
    })

    const onSubmit = values => {
        console.log('Form data', values)
    }
    return (
        <div style={{display: 'inline-block', position: 'absolute', borderTop: '1px solid #ddd', width: '100%'}}>
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
                                label='Email'
                                name='email'
                            />
                            <FormikControl
                                control='input'
                                type='password'
                                label='Password'
                                name='password'
                            />
                            <button type='submit' disabled={!formik.isValid}>로그인</button>
                        </Form>
                    }
                }
            </Formik>
        </div>
    );
}

export default withRouter(LoginPage);