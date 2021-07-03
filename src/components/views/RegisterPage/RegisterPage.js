import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function RegisterPage(props) {

    const initialValues = {
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
    }

    const onSubmit = values => {

    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Required'),
        password: Yup.string().required('Required'),
        passwordConfirm: Yup.string().required('Required')
    })

    return (
        <div style={{display: 'inline-block', position: 'absolute', borderTop: '1px solid #ddd',
            width: '100%'}}>
            <Formik

                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                >
                <Form>
                    <div className='form-control'>
                        <label htmlFor="name">Name</label>
                        <Field
                            type="text"
                            id="name"
                            name="name"
                        />
                       <ErrorMessage name='name'/>
                    </div>

                    <div className='form-control'>
                        <label htmlFor="email">Email</label>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            placeholder="이메일을 입력하세요"
                        />
                        <ErrorMessage name='email'/>
                    </div>

                    <div className='form-control'>
                        <label htmlFor="password">Password</label>
                        <Field type="password"
                               id="password"
                               name="password"
                               placeholder="8자 이상"
                        />
                        <ErrorMessage name='password'/>
                    </div>

                    <div className='form-control'>
                        <label htmlFor="passwordConfirm">Password Confirm</label>
                        <Field
                            type="password"
                            id="passwordConfirm"
                            name="passwordConfirm"
                            placeholder="8자 이상"
                        />
                       <ErrorMessage name='passwordConfirm'/>
                    </div>

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
}

export default RegisterPage;