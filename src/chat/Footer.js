import React from 'react'
import styled from 'styled-components';
import { Input } from 'antd';

const Wrapper = styled.div`
  height: 67px;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 560px;
  position: fixed;
  bottom: 0;
  background-color: black;
`;


export const Footer = () => {


  return (
    <Wrapper>
      <Input name="message" />
    </Wrapper>
  )
}
