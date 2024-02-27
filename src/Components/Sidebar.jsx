import { useEffect, useState } from "react";
import { MdPodcasts } from "react-icons/md";

import { IoCreate } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { CgLogIn } from "react-icons/cg";
import { BsPersonFillAdd } from "react-icons/bs";
import { NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { clearToken } from "../redux/features/token/tokenSlice";
import { clearUser } from "../redux/features/user/userSlice";
import { clearPodcast } from "../redux/features/podcast/podcastSlice";
import { clearEpisode } from "../redux/features/episods/episodsSlice";
import { current } from "@reduxjs/toolkit";

import { FaHeart } from "react-icons/fa";

import { toast } from "react-toastify";

function Sidebar() {
  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const body = document.querySelector("body");
    const logoSidebar = document.getElementById("logo-sidebar");

    const openSidebar = () => {
      body.style.overflowY = "hidden";
    };

    const closeSidebar = () => {
      body.style.overflowY = "auto";
    };

    logoSidebar.addEventListener("transitionend", () => {
      if (logoSidebar.classList.contains("translate-x-0")) {
        openSidebar();
      } else {
        closeSidebar();
      }
    });

    return () => {
      body.style.overflowY = "auto"; // Reset overflow when component unmounts
    };
  }, []);

  const handleNavLinkClick = () => {
    if (currentUser) {
      // User is present, navigate to the URL
      // You can replace '/create-a-podcast' with the actual URL
      return;
    } else {
      // User is not present, show toast notification
      toast.error("You need to be logged in to create a podcast");
    }
  };

  return (
    <aside
      id="logo-sidebar"
      class="fixed top-0 h-fit left-0 z-40 w-64 h-screen overflow-y-hidden pt-12 transition-transform -translate-x-full shadow  sm:translate-x-0  dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div class="h-full px-3 pb-4 pt-10  bg-black/30 backdrop-blur-2xl ">
        <ul class="space-y-2 font-medium">
          <li>
            <NavLink
              to="/podcasts"
              className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 group"
              // onClick={handleNavLinkClick}
            >
              <MdPodcasts className="text-gray-300 text-2xl" />
              <span class="ms-3 text-gray-300 whitespace-nowrap">Podcasts</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create-a-podcast"
              className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 group"
              // onClick={handleNavLinkClick}
            >
              <IoCreate className="text-gray-300 text-2xl" />
              <span class="flex-1 ms-3  text-gray-300 whitespace-nowrap">
                Create Podcast
              </span>
            </NavLink>
          </li>
          {currentUser && (
            <li>
              <NavLink
                to={`/profile/${currentUser?.uid}`}
                className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 group"
                // onClick={handleNavLinkClick}
              >
                <CgProfile className="text-gray-300 text-2xl" />
                <span class="flex-1 ms-3 text-gray-300 whitespace-nowrap">
                  Profile
                </span>
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/users"
              className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 group"
              // onClick={handleNavLinkClick}
            >
              <FaUsers className="text-gray-300 text-2xl flex-shrink-0" />
              <span className="ml-3 text-gray-300 truncate">Users</span>
            </NavLink>
          </li>
          {currentUser && (
            <li>
              <NavLink
                to={`/liked-podcast/${currentUser?.uid}`}
                className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 group"
                // onClick={handleNavLinkClick}
              >
                <FaHeart className="text-gray-300 text-2xl" />
                <span class="flex-1 ms-3 text-gray-300 whitespace-nowrap">
                  Liked Podcasts
                </span>
              </NavLink>
            </li>
          )}
          {currentUser && (
            <li>
              <NavLink
                to="/"
                className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 group"
                onClick={() => {
                  dispatch(clearToken());
                  dispatch(clearUser());
                  dispatch(clearPodcast());
                  dispatch(clearEpisode());
                }}
              >
                <CgLogOut className="text-gray-300 text-2xl" />
                <span class="flex-1 ms-3 text-gray-300 whitespace-nowrap">
                  Log Out
                </span>
              </NavLink>
            </li>
          )}

          {!currentUser && (
            <li>
              <NavLink
                to="/"
                className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 group"
              >
                <CgLogIn className="text-gray-300 text-2xl" />
                <span class="flex-1 ms-3 text-gray-300 whitespace-nowrap">
                  Log In
                </span>
              </NavLink>
            </li>
          )}
          {!currentUser && (
            <li>
              <NavLink
                to="/signup"
                className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 group"
              >
                <BsPersonFillAdd className="text-gray-300 text-2xl" />
                <span class="flex-1 ms-3 text-gray-300 whitespace-nowrap">
                  Sign Up
                </span>
              </NavLink>
            </li>
          )}
          <hr />
          <li>
            <NavLink
              to="https://mayur.fun"
              target="_blank"
              className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 group"
            >
              <span class="flex-1 ms-3 text-gray-400 font-normal whitespace-nowrap">
                About Me
              </span>
            </NavLink>
          </li>
          <li>
            <div
              className="footer text-xs flex text-gray-400 flex-col gap-4 pl-4 pr-4
  "
            >
              <div className="just-footer">
                Follow me on{" "}
                <span className="cursor-pointer hover:text-white">
                  <NavLink
                    to="https://www.linkedin.com/in/mayurhanwate/"
                    target="_blank"
                  >
                    LinkedIn
                  </NavLink>
                </span>{" "}
                ·{" "}
                <span className="cursor-pointer hover:text-white">
                  <NavLink to="https://github.com/lordbakyarou" target="_blank">
                    Github
                  </NavLink>
                </span>{" "}
                ·{" "}
                <span className="cursor-pointer hover:text-white">
                  <NavLink
                    to="https://leetcode.com/mayur1710hanwate/"
                    target="_blank"
                  >
                    Leetcode
                  </NavLink>
                </span>
              </div>
              <div className="actual-footer">
                © 2024 UNPAUSE FROM MAYUR HANWATE
              </div>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
