import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { serverConfig } from '../utils/config';
import { defaultAxios } from '../utils/axiosCall';

export const findOneOrCreate = createAsyncThunk("user/findOneOrCreate", async (userName, { rejectWithValue }) => {
  const params = {
    params: {
      userName: userName,
    },
  };
  try {
    const res = await defaultAxios.get(`${serverConfig['host']}/user/find-one-or-create`, params)
    localStorage.setItem('user', JSON.stringify(res.data));
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userNameIsValid: false,
    error: false,
    errorMessage: "",
  },
  extraReducers: builder => {
    builder
      .addCase(findOneOrCreate.fulfilled, (state, action) => {
        state.userNameIsValid = true;
      })
  }
})

export default userSlice.reducer