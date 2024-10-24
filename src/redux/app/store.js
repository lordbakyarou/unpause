import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import tokenReducer from "../features/token/tokenSlice";
import podcastReducer from "../features/podcast/podcastSlice";
import editPostReducer from "../features/editpost/editPostOpen";
import episodsReducer from "../features/episods/episodsSlice";
import musicReducer from "../features/music/musicSlice";
import allPodcastReducer from "../features/allPodcast/allPodcastSlice";
import themeReducer from "../features/theme/themeSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["music", "episode", "editPost"],
};

const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer,
  podcast: podcastReducer,
  editPost: editPostReducer,
  episode: episodsReducer,
  music: musicReducer,
  allPodcast: allPodcastReducer,
  theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
