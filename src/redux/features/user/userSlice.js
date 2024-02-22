import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      // console.log(action.payload.profilePic);
      // console.log(action.payload, "thsi is action payload");
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setCurrentUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
