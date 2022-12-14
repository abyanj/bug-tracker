import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'


// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
 }
  
//Register User
  const register = createAsyncThunk('auth/register',
  async (user, thunkApi) => {
   try {
     return await authService.register(user)
   } catch (error) {
     const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
     return thunkApi.rejectWithValue(message)
     
   }
 })

 //Login User
 const login = createAsyncThunk('auth/login',
 async (user, thunkApi) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkApi.rejectWithValue(message)
    
  }
})
//User Name
const getName = createAsyncThunk('auth/name', async(user, thunkApi) => {
  try {
    return await authService.getName(user)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    
    return thunkApi.rejectWithValue(message)
    
  }
}) 

 const logout = createAsyncThunk('auth/logout',
  async () => {
    await authService.logout()

 })
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(getName.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getName.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(getName.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })

      .addCase(logout.fulfilled, (state) => {state.user = null })
  },
})
 export  { logout, register, login, getName}
 
 export const { reset } = authSlice.actions
 export default authSlice.reducer