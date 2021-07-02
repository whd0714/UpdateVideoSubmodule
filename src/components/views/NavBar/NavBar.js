import React from 'react';
import LeftMenu from "./Section/LeftMenu";
import { Input } from 'antd';
import RightMenu from "./Section/RightMenu";

const { Search } = Input;

function NavBar(props) {

    const onSearch = () => {

    }

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <LeftMenu changeCollapsed={props.changeCollapsed}/>
            <Search placeholder="검색" allowClear onSearch={onSearch} style={{ width: '650px' }} />
            <RightMenu />
        </div>
    );
}

export default NavBar;