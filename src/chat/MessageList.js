import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { findAllById, updateContents } from './chatHistorySlice';
import { updateChatroomUser } from './chatRoomsSlice';
import socketIO from 'socket.io-client';
import { Avatar, List, FloatButton, Popconfirm } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"

const MessageList = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { history } = useSelector(state => state.chatHistory.findAllById)
  const { roomId } = params;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(findAllById(roomId));
  }, [roomId])

  useEffect(() => {
    const socket = socketIO.connect('http://localhost:3000', { transports: ['websocket', 'polling'] });

    socket.on('message', ({ data }) => {
      const newData = JSON.parse(data);
      if (newData.roomId === roomId) dispatch(updateContents(newData));
    })
    return () => {
      socket.disconnect();
    }
  }, [roomId])

  useEffect(() => {
    dispatch(updateChatroomUser(roomId));
  }, [])

  const exitRoom = () => {
    navigate(`/chat-list`);
  }

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={history}
        locale={{ emptyText: '채팅을 시작해보세요' }}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
              title={item.contents}
            />
          </List.Item>
        )}
      />

      <Popconfirm
        title="채팅방 나가기"
        description="채팅방을 나가시겠습니까?"
        onConfirm={exitRoom}
        onCancel={() => { }}
        okText="나가기"
        cancelText="취소"
      >
        <FloatButton type='primary' icon={<ExportOutlined />} />
      </Popconfirm>
    </>
  )
};

export default MessageList;
