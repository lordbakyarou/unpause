import { NavLink } from "react-router-dom";

import { useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { clearToken } from "../redux/features/token/tokenSlice";
import { clearUser } from "../redux/features/user/userSlice";
import { clearPodcast } from "../redux/features/podcast/podcastSlice";
import { clearEpisode } from "../redux/features/episods/episodsSlice";
import { useEffect, useState } from "react";
import { current } from "@reduxjs/toolkit";

import logo from "../assets/logo2.png";
import mainLogo from "../assets/mainlogo.png";

function Navbar() {
  const location = useLocation();

  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.user);

  const [scrolled, setScrolled] = useState(false);

  const [onScrollCode, setOnScrollCode] = useState(
    "w-full flex justify-center h-14 items-center gap-20 text-black font-semibold transition-all duration-1000 bg-white/30 backdrop-blur-xl top-0 z-50 fixed"
  );

  const [onScrollUpCode, setOnScrollUpCode] = useState(
    "w-full flex justify-center h-14 items-center  gap-20 bg-transparent  top-0 z-50 sticky"
  );

  useEffect(() => {
    function onScroll() {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [userPorfilePic, setUserProfilePic] = useState(
    currentUser?.profilePic ||
      "https://firebasestorage.googleapis.com/v0/b/podcast-application-react.appspot.com/o/default_pic%2Fvecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg?alt=media&token=4f0c367a-eaa7-44bb-9d87-3609fa380704"
  );

  const [menuButton, setMenuButton] = useState(false);

  useEffect(() => {}, [menuButton]);

  return (
    <nav class="fixed top-0 bg-black/30 backdrop-blur-2xl z-50 w-full">
      <div class="px-3 py-3 lg:px-5 lg:pl-3 ">
        <div class="flex items-center justify-between">
          <div class="flex items-center justify-start rtl:justify-end">
            <button
              onClick={() =>
                console.log(
                  document
                    .getElementById("logo-sidebar")
                    .classList.toggle("-translate-x-full")
                )
              }
              type="button"
              class="inline-flex items-center p-2 text-sm text-gray-300 rounded-lg sm:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200  "
            >
              <span class="sr-only">Open sidebar</span>
              <svg
                class="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <NavLink className="flex ms-2 items-center  md:me-24">
              <img
                src={mainLogo}
                class="h-10 me-3  cursor-pointer"
                alt="Brand Logo"
              />
              <span class="self-center text-xl font-semibold sm:text-2xl  cursor-pointer whitespace-nowrap dark:text-white">
                <img src={logo} className="w-32" />
              </span>
            </NavLink>
          </div>
          <div class="flex items-center">
            <div class="flex relative  items-center ms-3">
              <div>
                <button
                  type="button"
                  class="flex text-sm bg-gray-800 rounded-full focus:ring-2 focus:ring-text-color "
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                  onClick={() => setMenuButton(!menuButton)}
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="w-8 h-8 rounded-full"
                    src={
                      currentUser?.profilePic ||
                      "https://firebasestorage.googleapis.com/v0/b/podcast-application-react.appspot.com/o/default_pic%2Fvecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg?alt=media&token=4f0c367a-eaa7-44bb-9d87-3609fa380704"
                    }
                    alt="user photo"
                  />
                </button>
              </div>
              <div
                class={`z-50 top-[38px] w-48 -left-40 ${
                  menuButton ? "absolute" : "hidden"
                }   my-4 text-base list-none shadow-xl border-text-color bg-gray-800 backdrop-blur-2xl divide-y divide-gray-100 rounded shadow `}
              >
                <div className="bg-black/30 backdrop-blur-2xl">
                  {currentUser && (
                    <div class="px-4 py-3" role="none">
                      <p class="text-sm  dark:text-white" role="none">
                        {currentUser?.name}
                      </p>
                      <p
                        class="text-sm font-medium  truncate dark:text-gray-300"
                        role="none"
                      >
                        {currentUser?.email}
                      </p>
                    </div>
                  )}
                  {currentUser ? (
                    <ul class="py-1" role="none">
                      <li>
                        <NavLink
                          to="/podcasts"
                          className="block px-4 py-2 text-sm hover:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Podcasts
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/create-a-podcast"
                          className="block px-4 py-2 text-sm hover:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Create Podcast
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={`/profile/${currentUser?.uid}`}
                          className="block px-4 py-2 text-sm hover:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/"
                          className="block px-4 py-2 text-sm hover:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={() => {
                            dispatch(clearToken());
                            dispatch(clearUser());
                            dispatch(clearPodcast());
                            dispatch(clearEpisode());
                          }}
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  ) : (
                    <ul class="py-1" role="none">
                      <li>
                        <NavLink
                          to="/"
                          className="block px-4 py-2 text-sm text-text-color hover:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Login
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/signup"
                          className="block px-4 py-2 text-sm text-text-color hover:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Create Account
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
