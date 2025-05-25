// slices/todoSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fixed: Use fetch instead of fetchTodos (typo)
export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  return await response.json();
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {  // Fixed: Proper initialState definition
    isLoading: false,
    data: null,
    isError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;  // Fixed: Proper error handling
      });
  },
});

export default todoSlice.reducer;