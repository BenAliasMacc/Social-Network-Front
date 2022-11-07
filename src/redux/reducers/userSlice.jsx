import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/api/user/"

export const fetchUser = createAsyncThunk('user/fetchUser', async (userId) => {
    try {
        //const response = await fetch(`url`); //where you want to fetch data
        //Your Axios code part.
        const response = await axios(url + userId);//where you want to fetch data
        return response.data;
    } catch (error) {
        console.log(error);
    };
});

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        loading: 'idle',
        error: false
    },
    reducers: {
        editUser: (state, action) => {
            state.user.following = [...state.user.following, action.payload]
        },
        addFollow: (state, action) => {
            state.user.following = [...state.user.following, action.payload]
        },
        removeFollow: (state, action) => {
            state.user.following = state.user.following.filter((id) => id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = "loading";
            state.error = false
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = "loaded";
            state.error = false
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = "error";
            state.error = action.error.message;
        })
    }
});

export const selectUser = createSelector(
    (state) => ({
       user: state.userSlice.user,
       loading: state.userSlice.loading,
    }), (state) =>  state
);    

export const { editUser, addFollow, removeFollow } = userSlice.actions;

export default userSlice.reducer;
