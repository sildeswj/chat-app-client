// src/components/Chat.js
import React from 'react';
import styled from 'styled-components';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatContainer = styled.div`
    /* display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: 50px auto;
    border: 1px solid #ccc;
    border-radius: 10px;
    overflow: hidden; */
`;

const Chat = () => (
  <ChatContainer>
    <MessageList />
    <MessageInput />
  </ChatContainer>
);

export default Chat;
