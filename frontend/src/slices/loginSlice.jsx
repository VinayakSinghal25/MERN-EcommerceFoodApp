import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const registerUser = createAsyncThunk(
    'user/signup',
    async(userData) => {
        const url = `https://mern-ecommerce-food-app.vercel.app/api/user/register`;
        const response = await axios.post(url,userData);
        //const response = request.data;
        //localStorage.setItem('access_token', JSON.stringify(response.data.token));
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data; // Only return the data part
    }
);



export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userCredentials) => {
        const url = `https://mern-ecommerce-food-app.vercel.app/api/user/login`;
        const response = await axios.post(url, userCredentials);
        //const response = request.data.data;
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")):null,
        error: null
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user'); // Remove user from localStorage
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
        
            if (action.error.message === 'Request failed with status code 409') {
                state.error = 'User already exists';
            } else {
                state.error = action.error.message;
            }
        })
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
        
            if (action.error.message === 'Request failed with status code 404') {
                state.error = 'User not found with given email';
            } else if (action.error.message === 'Request failed with status code 401') {
                state.error = 'Incorrect password';
            } else {
                state.error = 'An error occurred during login';
            }
        });
    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
