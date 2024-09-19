import React, { useState } from 'react'
import MyGenerator from './generator'
import { Modal,Button,Space } from 'antd'
import View from './view';

export default function XRender() {
  const [schema, setSchema] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getSchema = (schema: any) => {
    setSchema(schema);
  }

  return (
    <>
    <Space>
      <Button type="primary" onClick={showModal}>
        Open MyGenerator
      </Button>
      <div>
        <View schema={schema} />
      </div>
    </Space>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={"80%"}>
      <MyGenerator  getValue={getSchema} />
      </Modal>
    </>
  );
};

