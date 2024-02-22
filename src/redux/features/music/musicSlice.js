import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  status: false, // Initial status could be 'stopped', 'playing', 'paused', etc.
  volume: 50, // Initial volume level
};

// Define slice
const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    playMusic(state) {
      state.status = true;
    },
    pauseMusic(state) {
      state.status = false;
    },

    setVolume(state, action) {
      state.volume = action.payload;
    },
  },
});

// Export action creators
export const { playMusic, pauseMusic, setVolume } = musicSlice.actions;

// Export reducer
export default musicSlice.reducer;
