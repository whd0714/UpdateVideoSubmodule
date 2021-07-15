import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Menu } from 'antd';
import {userLogout} from "../../../../_actions/user_action";
import { message } from "antd";
import { VideoCameraAddOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

function RightMenu(props) {

    const dispatch = useDispatch();

    const user = useSelector(state=>state.user);

    const [current, setCurrent] = useState("");

    const handleClick = (e) => {
        console.log(e)
        setCurrent(e.key)
    }

    useEffect(()=>{
        console.log(user)
    },[user])

    const handleLogout = () => {
        dispatch(userLogout())
            .then(response => {
                if(response.payload.success) {
                    message.success('로그아웃 성공')

                    window.location.reload()
                }
            })
    }

    if(user.auth != null) {
        if(user.auth.data== null) {
            return (
                <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal"
                      style={{border: 'none', padding: '10px 0', width:'157px'}}>
                    <Menu.Item key="signup">
                        <a href="/signup" rel="noopener noreferrer">
                            Signup
                        </a>
                    </Menu.Item>
                    <Menu.Item key="login">
                        <a href="/login"  rel="noopener noreferrer">
                            Login
                        </a>
                    </Menu.Item>
                </Menu>
            );
        } else {
            return (
                <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal"
                      style={{display:'flex', border: 'none', padding: '10px 0', width:'141px'}}>
                    <Menu.Item key="addVideo">
                        <a href={`/channel/${user.auth.data.memberId}/main`}>
                            <VideoCameraAddOutlined style={{fontSize:'20px'}}/>
                        </a>
                    </Menu.Item>
                    <Menu.Item key="logout" onClick={handleLogout}>
                        logout
                    </Menu.Item>
                </Menu>
            );
        }
    } else {
        return (
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal"
                  style={{border: 'none', padding: '10px 0', width:'157px'}}>
                <Menu.Item key="signup">
                    <a href="/signup" rel="noopener noreferrer">
                        Signup
                    </a>
                </Menu.Item>
                <Menu.Item key="login">
                    <a href="/login"  rel="noopener noreferrer">
                        Login
                    </a>
                </Menu.Item>
            </Menu>
        );
    }

}

export default RightMenu;