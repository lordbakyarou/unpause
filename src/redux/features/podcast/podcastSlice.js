import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  podcast: [],
};

const podcastSlice = createSlice({
  name: "podcast",
  initialState,
  reducers: {
    addPodcast: (state, action) => {
      const newArr = state.podcast;
      newArr.push(action.payload);
      state.podcast = newArr;
    },
    updatePodcast: (state, action) => {
      const updatedPodcast = action.payload; // Assuming action.payload is the updated podcast object
      const index = state.podcast.findIndex(
        (podcast) => podcast.podcastId === updatedPodcast.podcastId
      );
      if (index !== -1) {
        state.podcast[index] = updatedPodcast;
      }
    },
    removePodcast: (state, action) => {
      // const newArr = [...state.podcast];
      // console.log(newArr);
      // newArr.splice(action.payload, 1);
      //   state.podcast = [...newArr];
    },
    clearPodcast: (state, action) => {
      state.podcast = [];
    },
  },
});

export const { addPodcast, removePodcast, clearPodcast, updatePodcast } =
  podcastSlice.actions;

export default podcastSlice.reducer;

export const selectPodcastById = (state, id) =>
  state.podcast.podcast.find((podcast) => podcast.podcastId === id);
