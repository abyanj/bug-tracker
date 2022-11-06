import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import bugService from './bugService'


const initialState = {
  bugs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Create new bug
export const createBug = createAsyncThunk('bugs/create', async(bugData, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.user.token
    return await bugService.createBug(bugData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkApi.rejectWithValue(message)
    
  }
}) 

//Get user bugs
export const getBugs = createAsyncThunk('bugs/getAll', async (_, 
  thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token
      return await bugService.getBugs(token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkApi.rejectWithValue(message)
    }
  })


  // Delete user bug
export const deleteBug = createAsyncThunk(
  'bugs/delete',
  async (id, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token
      return await bugService.deleteBug(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkApi.rejectWithValue(message)
    }
  }
)


export const bugSlice = createSlice({
  name: 'bug',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) =>{
    builder
      .addCase(createBug.pending, (state) => {
        state.isLoading = true

      })
      .addCase(createBug.fulfilled, (state, action) =>{
        state.isLoading = false
        state.isSuccess = true
        state.bugs.push(action.payload)
      })
      .addCase(createBug.rejected, (state, action) =>{
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      
      .addCase(getBugs.pending, (state) => {
        state.isLoading = true

      })
      .addCase(getBugs.fulfilled, (state, action) =>{
        state.isLoading = false
        state.isSuccess = true
        state.bugs = action.payload
      })
      .addCase(getBugs.rejected, (state, action) =>{
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(deleteBug.pending, (state) => {
        state.isLoading = true

      })
      .addCase(deleteBug.fulfilled, (state, action) =>{
        state.isLoading = false
        state.isSuccess = true
        state.bugs = state.bugs.filter((bug) => bug._id !== action.payload.id)
      })
      .addCase(deleteBug.rejected, (state, action) =>{
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

  }
})

export const { reset } = bugSlice.actions

export default bugSlice.reducer