import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'


const initialState = {
  bugs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}


export const bugSlice = createSlice({
  name: 'bug',
  initialState,
  reducers: {
    reset: (state) => initialState
  }
})

export const {reset} = bugSlice.actions

export default bugSlice.reducer