import React, {useEffect} from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import {userAuth} from "../_actions/user_action";

export default function (SpecificComponent, option, adminRoute = null) {

    function AuthenticationCheck(props) {

        const dispatch = useDispatch();

        useEffect(()=>{
            dispatch(userAuth())
                .then(response=>{
                    console.log("!!!!!!" + response.payload.success)
                    console.log("!!!!!!" + response.payload.member)
                })
        }, [])

        return <SpecificComponent />
    }

    return AuthenticationCheck;
}