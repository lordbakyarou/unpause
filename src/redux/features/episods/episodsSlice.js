import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  episode: null,
};

const episodeSlice = createSlice({
  name: "episode",
  initialState,
  reducers: {
    setEpisode: (state, action) => {
      state.episode = action.payload;
    },
    clearEpisode: (state) => {
      state.episode = null;
    },
    increaseIndex: (state) => {
      // console.log(state.episode.index, state.episode.episodes.length);
      if (state.episode.index < state.episode.episodes.length - 1)
        state.episode.index = state.episode.index + 1;
    },
    decreaseIndex: (state) => {
      if (state.episode.index > 0)
        state.episode.index = state.episode.index - 1;
    },
    resetIndex: (state) => {
      state.episode.index = 0;
      console.log(state.episode.index);
    },
  },
});

export const {
  setEpisode,
  clearEpisode,
  increaseIndex,
  decreaseIndex,
  resetIndex,
} = episodeSlice.actions;

export default episodeSlice.reducer;
