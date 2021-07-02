import React from 'react';
import { MenuOutlined, PlaySquareFilled } from '@ant-design/icons';

function LeftMenu(props) {


    return (
        <div style={{display: 'flex', alignItems: 'center', width: '12%', justifyContent: 'space-between', padding: '0 15px'}}>
            <MenuOutlined style={{fontSize: '25px', cursor: 'pointer'}} onClick={props.changeCollapsed}/>
            <a href="/" style={{display:'flex', alignItems: 'center'}}>
                <PlaySquareFilled style={{fontSize: '30px', color: 'red'}} />
                <span style={{fontSize:'20px', fontWeight: 'bold', color: 'black', letterSpacing: '-1px'}}>MyTube</span>
            </a>
        </div>
    );
}

export default LeftMenu;