import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Table, Upload } from 'antd';
import React, { useEffect, useCallback, useState } from 'react';

const { Dragger } = Upload;

const App1: React.FC<{ getControl: (control: any) => void }> = ({ getControl }) => {
    const [abort, setAbort] = React.useState(false);
    const [fileList, setFileList] = React.useState<any[]>([]);
    const  [control,setControl] = useState(new AbortController());
    const signal = control.signal;

    const props: UploadProps = {
        multiple: true,
        customRequest(options) {
            const { file } = options;
            const formData = new FormData();
            formData.append('file', file);
            fetch('/api/upload', {
                method: 'POST',
                body: formData,
                signal
            }).then(() => {
            })
        },
        beforeUpload(file) {
            debugger
            if(control.signal.aborted) {
                console.log(12)
                setControl( new AbortController());
            }
            return true;
        },
        // onChange(info) {
        //     const { status } = info.file;
        //     if (status !== 'uploading') {
        //         console.log(info.file, info.fileList);
        //     }
        //     if (status === 'done') {
        //         message.success(`${info.file.name} file uploaded successfully.`);
        //     } else if (status === 'error') {
        //         message.error(`${info.file.name} file upload failed.`);
        //     }
        // },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        fileList,

    };

    return (
        <> <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
            </p>
        </Dragger>
        <Table dataSource={fileList} columns={[{
            title: 'File Name',
            dataIndex: 'name',
            key: 'name',
        },{
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <Button onClick={() => {
                    setFileList(fileList.filter((item) => item.uid !== record.uid));
                }}>Delete</Button>
            )
        }]} />
        <Button onClick={() => {
       
        control?.abort();
    }}>Aborted</Button>
        </>
       
    );
};

// const AbortedAction: React.FC<{ control: AbortController | null }> = ({ control }) => {
//     return
// }

const App = () => {
    const [control, setControl] = React.useState<any>(null);

    const handleGetControl = useCallback((control: any) => {
        setControl(control);
    }, []);

    return (
        <div>
            <App1 getControl={handleGetControl} />
            {/* <AbortedAction control={control} /> */}
        </div>
    )
}

export default App;
