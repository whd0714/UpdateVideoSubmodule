import React, {useState} from 'react';
import { Input, Typography, Table, Radio, Divider, Button } from 'antd';
import VideoUploadPage from "./Section/VideoUploadPage";

const { Title } = Typography;

const columns = [
    {
        title: '동영상',
        dataIndex: 'video',
        render: (text) => <a>{text}</a>,
    },
    {
        title: '공개상태',
        dataIndex: 'videoStatus',
    },
    {
        title: '날짜',
        dataIndex: 'date',
    },
    {
        title: '조회수',
        dataIndex: 'view',
    },
    {
        title: '좋아요',
        dataIndex: 'like',
    },
    {
        title: '싫어요',
        dataIndex: 'unlike',
    },
];
const data = [
    {
        key: '1',
        video: '아이유',
        videoStatus: '공개중',
        date: '2021-07-15',
        view: 100,
        like: 10,
        unlike: 5,
    },
];



function UploaderPage(props) {


    const [selectedRowKeys, setSelectedRowKeys] = useState('checkbox');

    const [isVideoUploadModalOn, setIsVideoUploadModalOn] = useState(false);

    const handleVideoModal = () => {
        setIsVideoUploadModalOn(!isVideoUploadModalOn);
        console.log("!!!" + isVideoUploadModalOn)
    }

    const onSelectChange =  (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        selectedRowKeys(selectedRowKeys);
    };



    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    //업로드한 비디오가 없을 경우 테이블
   /* if(videoDate == null) {
        return (
            <div style={{display: 'inline-block', position: 'absolute', borderTop: '1px solid #ddd',
                width: '100%'}}>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <Title level={4} style={{padding:'20px 25px'}}>채널 콘텐츠</Title>
                    <div>
                        <div>
                            필터
                        </div>

                        <Divider />

                        <div>
                            <Table
                                rowSelection={{
                                    rowSelection
                                }}
                                columns={columns}
                                dataSource={nullDate}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }*/

   return (

       <div style={{display: 'inline-block', position: 'absolute', borderTop: '1px solid #ddd',
           width: '100%'}}>

           {isVideoUploadModalOn && (
               <VideoUploadPage modalHandler={handleVideoModal} modelState={isVideoUploadModalOn}/>
           )}

           <div style={{display:'flex', flexDirection:'column'}}>
               <Title level={4} style={{padding:'20px 25px'}}>채널 콘텐츠</Title>
               <div>
                   <div>
                       필터
                   </div>

                   <Button onClick={handleVideoModal}>동영상 올리기</Button>

                   <Divider />


                   <div>
                       <Table
                           rowSelection={{
                               rowSelection
                           }}
                           columns={columns}
                           dataSource={data}
                       />
                   </div>
               </div>
           </div>
       </div>
   );

}

export default UploaderPage;