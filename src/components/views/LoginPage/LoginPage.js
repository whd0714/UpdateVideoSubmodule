import React from 'react';
import { withRouter } from 'react-router-dom';

function LoginPage(props) {
    return (
        <div style={{display: 'inline-block', position: 'absolute', borderTop: '1px solid #ddd', width: '100%'}}>
            로그인
        </div>
    );
}

export default withRouter(LoginPage);