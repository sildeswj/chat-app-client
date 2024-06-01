import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { create } from './chatHistorySlice';

const InputContainer = styled.div`
    display: flex;
    padding: 10px;
    background: #fff;
    border-top: 1px solid #ccc;
`;

const Input = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    background: #007bff;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background: #0056b3;
    }
`;

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleSend = () => {
    if (message.trim()) {
      dispatch(create(message));
      setMessage('');
    }
  };

  return (
    <InputContainer>
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <Button onClick={handleSend}>Send</Button>
    </InputContainer>
  );
};

export default MessageInput;
