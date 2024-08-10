import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../slices/loginSlice.jsx'

const store = configureStore({
    reducer: {
      user: userReducer,
    },
  });
  

export default store ;