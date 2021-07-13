import React, {useEffect, useState} from 'react';
import axios from "axios";
import { message } from 'antd';
import { useDispatch } from "react-redux";
import {userAuth} from "../_actions/user_action";

export default function (SpecificComponent, option, adminRoute = null) {

    function AuthenticationCheck(props) {


        const dispatch = useDispatch();

        useEffect(()=>{
            dispatch(userAuth())
                .then(response=>{
                    if(response.payload.success) {
                        console.log("회원 로그인 정보 = ",response.payload.data)
                        if(!option) {
                            props.history.push('/')
                        }
                    } else {
                        console.log("회원 로그인 정보 = ",response.payload.data)
                        if(option) {
                            message.info('로그인 후 이용가능합니다.')
                            props.history.push('/login')
                        }

                    }
                })
        }, [])



        return <SpecificComponent />
    }

    return AuthenticationCheck;
}