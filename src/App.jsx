import "./App.css";

import Navbar from "./Components/Navbar";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import CreatePodcast from "./Pages/CreatePodcast";
import Podcasts from "./Pages/Podcasts";
import PodcastDetail from "./Pages/PodcastDetail";

import { Routes, Route } from "react-router-dom";
import Profile from "./Pages/Profile";
import PodcastPlayer from "./Components/PodcastPlayer";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const episode = useSelector((state) => state.episode.episode);

  return (
    <div className="relative w-screen h-screen flex justify-center bg-primary-background text-primary-text-color scrollbar-hide">
      <div className="w-full h-full absolute top-0 z-50 ">
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/podcast/:uid/:id" element={<PodcastDetail />} />
          <Route path="/create-a-podcast" element={<CreatePodcast />} />
          <Route path="/profile/:uid" element={<Profile />} />
        </Routes>
        {episode && <PodcastPlayer />}
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
