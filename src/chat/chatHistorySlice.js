import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { serverConfig } from '../utils/config';
import { defaultAxios } from '../utils/axiosCall';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:3000', { transports: ['websocket', 'polling'] });

export const create = createAsyncThunk("chatHistory/create", async (message, { rejectWithValue, getState }) => {
  const state = getState();
  const roomId = state.chatHistory.findAllById.roomId;
  const user = JSON.parse(localStorage.getItem("user"));
  const params = {
    userId: user._id,
    roomId: roomId,
    contents: message
  }
  try {
    const res = await defaultAxios.post(`${serverConfig['host']}/chat-history`, params)
    await defaultAxios.patch(`${serverConfig['host']}/chat-room/${roomId}`, { _id: roomId, lastContents: message })
    socket.emit('message', { roomId: roomId, contents: message });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
});

export const findAllById = createAsyncThunk("chatHistory/findAllById", async (roomId, { rejectWithValue }) => {
  try {
    const params = {
      params: {
        roomId: roomId,
      },
    };
    const res = await defaultAxios.get(`${serverConfig['host']}/chat-history/find-all-by-id`, params)
    const retData = {
      history: res.data,
      roomId: roomId
    }
    return retData;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

// export const exitRoomFunc = createAsyncThunk("chatHistory/exit-room", async (x, { rejectWithValue, getState }) => {
//   try {
//     const state = getState();
//     const roomId = state.chatHistory.findAllById.roomId;
//     const user = JSON.parse(localStorage.getItem("user"));
//     const params = {
//       userId: user._id,
//       roomId: roomId,
//     }
//     await defaultAxios.patch(`${serverConfig['host']}/chat-room/exit-room`, params)

//   } catch (err) {
//     return rejectWithValue(err.response.data)
//   }
// })

export const chatHistorySlice = createSlice({
  name: 'chatHistory',
  initialState: {
    createdNewChatroom: false,
    error: false,
    errorMessage: "",
    findAllById: {
      roomId: "",
      history: [],
      error: false,
      errorMessage: ""
    }
  },
  reducers: {
    updateContents: (state, action) => {
      const newHistory = [...state.findAllById.history, action.payload]
      state.findAllById.history = newHistory
    },
  },
  extraReducers: builder => {
    builder
      .addCase(create.fulfilled, (state, action) => {
        state.createdNewChatroom = true;
      })
      .addCase(findAllById.fulfilled, (state, action) => {
        state.findAllById.history = action.payload.history;
        state.findAllById.roomId = action.payload.roomId;
      })
  }
})

export const { updateContents } = chatHistorySlice.actions

export default chatHistorySlice.reducer