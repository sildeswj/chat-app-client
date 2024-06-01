import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { serverConfig } from '../utils/config';
import { defaultAxios } from '../utils/axiosCall';

export const create = createAsyncThunk("chatRoom/create", async (chatRoomData, { rejectWithValue }) => {
  const params = {
    title: chatRoomData.title,
    userId: chatRoomData.userId
  }
  try {
    const res = await defaultAxios.post(`${serverConfig['host']}/chat-room`, params)
    localStorage.setItem('chatRoom', JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
});

export const headerSlice = createSlice({
  name: 'chatRoom',
  initialState: {
    createdNewChatroom: false,
    roomId: "",
    error: false,
    errorMessage: "",
  },
  extraReducers: builder => {
    builder
      .addCase(create.fulfilled, (state, action) => {
        state.roomId = action.payload._id;
        state.createdNewChatroom = true;
      })
  }
})

export default headerSlice.reducer