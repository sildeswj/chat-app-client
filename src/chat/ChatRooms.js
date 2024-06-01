import React, { useEffect } from 'react';
import { Avatar, List } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { findAll } from './chatRoomsSlice';
import { Link } from 'react-router-dom';

export const ChatRooms = () => {
  const dispatch = useDispatch();
  const { chatRooms } = useSelector(state => state.chatRooms)

  useEffect(() => {
    dispatch(findAll(''))
  }, [])

  return (
    <List
      itemLayout="horizontal"
      dataSource={chatRooms}
      locale={{ emptyText: '채팅방을 만들어보세요' }}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
            title={<Link to={`/chat/${item._id}`}>제목: {item.title}</Link>}
            description={`마지막 글: ${item.lastContents || '없음'}`}
          />
        </List.Item>
      )}
    />
  )
};