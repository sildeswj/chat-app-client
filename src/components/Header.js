import React, { useState } from 'react'
import { useEffect } from 'react';
import { Header as AHeader } from 'antd/es/layout/layout'
import { EditOutlined } from '@ant-design/icons';
import { Button, Modal, Form, Alert, Input } from 'antd';
import { create } from './headerSlice';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"


export const Header = () => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createdNewChatroom, roomId } = useSelector(state => state.header);

  const navigate = useNavigate();

  const handleSubmit = (data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { _id } = user
    const newData = { title: data.title, userId: _id }
    dispatch(create(newData))
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (createdNewChatroom) navigate(`/chat/${roomId}`);
  }, [createdNewChatroom])

  return (
    <AHeader style={{ textAlign: 'right' }}>
      <Button type="primary" icon={<EditOutlined />} onClick={() => setIsModalOpen(true)}>
        채팅방 개설
      </Button>
      <Modal
        title="채팅방 개설"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
      >
        <Form name="create_chatroom" style={{ marginTop: 30 }} onFinish={handleSubmit}>
          {/* {error && (<Alert message={errorMessage} type="error" showIcon />)} */}
          <Form.Item
            label="Title"
            name="title"
            validateTrigger="onBlur"
            rules={[{ required: true, message: '제목을 입력해주세요' }, { min: 3, max: 20 }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </AHeader>
  )
}
