import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { serverConfig } from '../utils/config';
import { defaultAxios } from '../utils/axiosCall';

export const findAll = createAsyncThunk("chatRoom/all", async (x, { rejectWithValue }) => {
  try {
    const res = await defaultAxios.get(`${serverConfig['host']}/chat-room`)
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
});

export const updateChatroomUser = createAsyncThunk("chatRoom/updateChatroomUser", async (roomId, { rejectWithValue }) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const params = {
      userId: user._id,
      roomId: roomId,
    }
    const res = await defaultAxios.patch(`${serverConfig['host']}/chat-room/update-chatroom-user`, params)
    return res.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const headerSlice = createSlice({
  name: 'chatRooms',
  initialState: {
    chatRooms: [],
    error: false,
    errorMessage: "",
  },
  extraReducers: builder => {
    builder
      .addCase(findAll.fulfilled, (state, action) => {
        state.chatRooms = action.payload;
      })
      .addCase(updateChatroomUser.fulfilled, (state, action) => {
      })
  }
})

export default headerSlice.reducer