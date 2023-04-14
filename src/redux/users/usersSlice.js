import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    isLoading: false,
    error: undefined,
};

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (thunkAPI) => {
        try {
            const response = await fetch("https://randomuser.me/api/?results=10");
            const data = await response.json();
            return data.results;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUsers.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export const getUsers = (state) => state.users;

export default usersSlice.reducer;
