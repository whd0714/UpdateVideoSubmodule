import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Tooltip, Typography, Divider } from 'antd';
import './VideoUploadCss.css';

const { Title } = Typography;

function VideoUploadPage(props) {

    const onHandCloseHandler = () => {

        props.modalHandler(props.modelState)
    }

    return (
        <div style={{position:'fixed',width:'100%', height:'100%', zIndex:'1', top:'0', left:0, display:'flex', justifyItems:'center', alignItems:'center',
            backgroundColor:'white', justifyContent:'center', boxShadow:'0 2px 7px rgba(0,0,0,0.5)', background:'rgba(0, 0, 0, 0.7)'}}>
            alignContent
           <div style={{position:'absolute', background:'white', width:'80%'}}>
               <div className="closeBox" style={{padding:'15px 15px', float:'right', fontSize:'20px', zIndex:'10000'}}>
                   <Tooltip placement='bottom' title='닫기' zIndex='2' arrowPointAtCenter>
                       <CloseOutlined onClick={onHandCloseHandler} className="closeBtn"/>
                   </Tooltip>
               </div>


               <div>
                   <Title style={{padding:'20px 0 0 15px', margin:'0', display:'inline-block', alignSelf:'center'}} level={3}>동영상 업로드</Title>

                    <Divider></Divider>

               </div>

           </div>
        </div>
    );
}

export default VideoUploadPage;