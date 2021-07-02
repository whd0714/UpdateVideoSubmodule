import React, {useEffect, useState} from 'react';
import { Layout, Menu } from 'antd';
import { HomeFilled, VideoCameraFilled, HistoryOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;


function SiderMenu(props) {

    const [collapsed, setCollapsed] = useState(false);

    const [current, setCurrent] = useState("1");

    const handleClick = (e) => {
        console.log(e)
        setCurrent(e.key)
    }

    useEffect(()=>{
        setCollapsed(!collapsed)
    },[props.collapsed])

    return (
        <Layout style={{display: 'inline-block', marginRight: '15px'}}>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{}}>
                <div className="logo" />
                <Menu theme="light" mode="inline" onClick={handleClick} defaultSelectedKeys={'11'} selectedKeys={[current]} style={{border: 'none'}}>
                    <Menu.Item key="1" icon={<HomeFilled />}>
                        <span style={{padding:'0 10px'}}>홈</span>
                        <Link to="/"/>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraFilled />}>
                        <span style={{padding:'0 10px'}}>구독</span>
                        <Link to="/login"/>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<HistoryOutlined />}>
                        <span style={{padding:'0 10px'}}>시청기록</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        </Layout>
    );
}

export default SiderMenu;