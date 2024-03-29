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
import TwinklingStars from "./Components/TwinklingStars";
import Sidebar from "./Components/Sidebar";
import LikedPodcasts from "./Pages/LikedPodcast";
import Users from "./Pages/Users";
import { useState } from "react";
import { doc } from "firebase/firestore";

function App() {
  const episode = useSelector((state) => state.episode.episode);
  const [sidebarNavbar, setSidebarNavigation] = useState(false);

  return (
    <div className="homescreen m-0 flex  flex-col w-screen justify-center bg-gray-900 h-screen text-gray-100 ">
      <div className="relative w-screen overflow-auto h-screen flex justify-center text-primary-text-color bg-transparent scrollbar-hide">
        <div
          className="w-full h-full absolute top-0 z-50 "
          onClick={(e) => {
            e.stopPropagation();
            let element = document.getElementById("logo-sidebar");

            const list = element.classList;
            if (!list.value.includes("-translate-x-full")) {
              element.classList.add("-translate-x-full");
            }

            let profile = document.getElementById("profile-menu");
            const pro = profile.classList.value.includes("absolute");
            // console.log(pro);
            if (pro) {
              profile.classList.remove("absolute");
              profile.classList.add("hidden");
            }
          }}
        >
          <Navbar />
          <Sidebar />

          <TwinklingStars />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/podcast/:uid/:id" element={<PodcastDetail />} />
            <Route path="/create-a-podcast" element={<CreatePodcast />} />
            <Route path="/profile/:uid" element={<Profile />} />
            <Route path="/liked-podcast/:uid" element={<LikedPodcasts />} />
            <Route path="/users" element={<Users />} />
          </Routes>
          {episode && <PodcastPlayer />}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default App;
