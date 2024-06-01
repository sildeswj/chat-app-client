import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Typography, Button, Alert } from "antd";
import { useSelector, useDispatch } from 'react-redux'
import { findOneOrCreate } from "../user/userSlice";
import styled from 'styled-components';

const { Title } = Typography;

const Wrapper = styled.div`
  margin: auto;
`

const tailLayout = {
  wrapperCol: {
    offset: 4,
  },
};

const Home = () => {
  const dispatch = useDispatch()
  const { error, errorMessage } = useSelector(state => state.user)


  const navigate = useNavigate();

  const handleSubmit = ({ userName }) => {
    dispatch(findOneOrCreate(userName))
    navigate('/chat-list');
  };

  return (
    <Wrapper>
      <Title level={3}>
        아이디로 사용하실 이름을 넣으시고 접속 해주세요.
      </Title>
      <Form name="create_chatroom" style={{ maxWidth: 360, marginTop: 30 }} onFinish={handleSubmit}>
        {error && (<Alert message={errorMessage} type="error" showIcon />)}
        <Form.Item
          label="아이디"
          name="userName"
          validateTrigger="onBlur"
          rules={[{ required: true, message: '아이디를 입력해주세요' }, { min: 3 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  )
};

export default Home;