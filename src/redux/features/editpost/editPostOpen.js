import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const editPostOpen = createSlice({
  name: "podcast",
  initialState,
  reducers: {
    openPost: (state, action) => true,

    closePost: (state, action) => false,
  },
});

export const { openPost, closePost } = editPostOpen.actions;

export default editPostOpen.reducer;
