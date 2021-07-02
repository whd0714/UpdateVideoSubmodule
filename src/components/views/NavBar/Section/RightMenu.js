import React, { useState } from 'react';
import { Menu } from 'antd';

const { SubMenu } = Menu;

function RightMenu(props) {

    const [current, setCurrent] = useState("");

    const handleClick = (e) => {
        console.log(e)
        setCurrent(e.key)
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" style={{border: 'none', padding: '10px 0'}}>
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

export default RightMenu;