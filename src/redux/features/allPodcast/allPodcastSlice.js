import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPodcast: [],
};

const allPodcast = createSlice({
  name: "allPodcast",
  initialState,
  reducers: {
    addAllPodcast: (state, action) => {
      state.allPodcast = action.payload;
    },
    clearAllPodcast: (state, action) => {
      state.allPodcast = [];
    },
  },
});

export const { addAllPodcast, clearAllPodcast } = allPodcast.actions;

export default allPodcast.reducer;
