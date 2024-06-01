import { configureStore } from "@reduxjs/toolkit";

import userSlice from '../user/userSlice'
import headerSlice from "./headerSlice";
import chatRoomsSlice from "../chat/chatRoomsSlice";
import chatHistorySlice from "../chat/chatHistorySlice";

export default configureStore({
  reducer: {
    user: userSlice,
    header: headerSlice,
    chatRooms: chatRoomsSlice,
    chatHistory: chatHistorySlice
  }
})