import "./App.css";

import { lazy, Suspense, useState } from "react";

import Navbar from "./Components/Navbar";
// import Signup from "./Pages/Signup";
const Signup = lazy(() => import("./Pages/Signup"));
// import Login from "./Pages/Login";
const Login = lazy(() => import("./Pages/Login"));
// import CreatePodcast from "./Pages/CreatePodcast";
const CreatePodcast = lazy(() => import("./Pages/CreatePodcast"));
// import Podcasts from "./Pages/Podcasts";
const Podcasts = lazy(() => import("./Pages/Podcasts"));
// import PodcastDetail from "./Pages/PodcastDetail";
const PodcastDetail = lazy(() => import("./Pages/PodcastDetail"));
// import LikedPodcasts from "./Pages/LikedPodcast";
const LikedPodcasts = lazy(() => import("./Pages/LikedPodcast"));
// import Users from "./Pages/Users";
const Users = lazy(() => import("./Pages/Users"));
// import Profile from "./Pages/Profile";
const Profile = lazy(() => import("./Pages/Profile"));

import { Routes, Route } from "react-router-dom";
import PodcastPlayer from "./Components/PodcastPlayer";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TwinklingStars from "./Components/TwinklingStars";
import Sidebar from "./Components/Sidebar";
import UpdatedSidebar from "./Components/UpdatedSidebar";
import FallbackUI from "./Components/FallbackUI";

function App() {
  const episode = useSelector((state) => state.episode.episode);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Suspense fallback={<FallbackUI />}>
      <div className="homescreen m-0 flex  flex-col w-screen justify-center bg-[#0F1014] h-screen text-gray-100 ">
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
            <Navbar isHovered={isHovered} setIsHovered={setIsHovered} />
            <UpdatedSidebar isHovered={isHovered} setIsHovered={setIsHovered} />

            <TwinklingStars />
            <Routes>
              <Route
                path="/"
                element={
                  <Suspense fallback={<h1>Loading</h1>}>
                    <Login />
                  </Suspense>
                }
              />
              <Route
                path="/signup"
                element={
                  <Suspense fallback={<h1>Loading</h1>}>
                    <Signup />
                  </Suspense>
                }
              />
              <Route path="/podcasts" element={<Podcasts />} />
              <Route
                path="/podcast/:uid/:id"
                element={
                  <Suspense fallback={<h1>Loading</h1>}>
                    <PodcastDetail />
                  </Suspense>
                }
              />
              <Route
                path="/create-a-podcast"
                element={
                  <Suspense fallback={<h1>Loading</h1>}>
                    <CreatePodcast />
                  </Suspense>
                }
              />
              <Route
                path="/profile/:uid"
                element={
                  <Suspense fallback={<h1>Loading</h1>}>
                    <Profile />
                  </Suspense>
                }
              />
              <Route
                path="/liked-podcast/:uid"
                element={
                  <Suspense fallback={<h1>Loading</h1>}>
                    <LikedPodcasts />
                  </Suspense>
                }
              />
              <Route
                path="/users"
                element={
                  <Suspense fallback={<h1>Loading</h1>}>
                    <Users />
                  </Suspense>
                }
              />
            </Routes>
            {episode && <PodcastPlayer />}
            <ToastContainer />
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default App;
