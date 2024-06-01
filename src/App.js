import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, redirect } from 'react-router-dom';
import { Flex, Layout } from 'antd';
import Home from './main/Home';
import { Header } from './components/Header';
import { ChatRooms } from './chat/ChatRooms';

import Chat from './chat/Chat';

const user = localStorage.getItem("user");
const App = () => (
  <BrowserRouter>
    <Layout>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <ChatRooms />
            ) : (
              <Home />
            )
          }
        ></Route>
        <Route path="/chat-list" element={<ChatRooms />}></Route>
        <Route path="/chat/:roomId" element={<Chat />}></Route>
      </Routes>
    </Layout>
  </BrowserRouter>
)

export default App;