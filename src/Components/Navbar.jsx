import { NavLink } from "react-router-dom";

import { useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { clearToken } from "../redux/features/token/tokenSlice";
import { clearUser } from "../redux/features/user/userSlice";
import { clearPodcast } from "../redux/features/podcast/podcastSlice";
import { clearEpisode } from "../redux/features/episods/episodsSlice";
import { useEffect } from "react";

import logo from "../assets/logo2.png";
import mainLogo from "../assets/mainlogo.png";
import ThemeToggle from "./ThemeToggle";

function Navbar({
  sidebarNavigation,
  setSidebarNavigation,
  isHovered,
  setIsHovered,
}) {
  const token = useSelector((state) => state.token.token);
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.user);

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

  // const [userPorfilePic, setUserProfilePic] = useState(
  //   currentUser?.profilePic ||
  //     "https://firebasestorage.googleapis.com/v0/b/podcast-application-react.appspot.com/o/default_pic%2Fvecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg?alt=media&token=4f0c367a-eaa7-44bb-9d87-3609fa380704"
  // );

  console.log(currentUser?.profilePic);

  return (
    <nav className="fixed top-0 dark:bg-black/30 bg-gray-200 backdrop-blur-2xl z-50 w-screen">
      <div className="px-3 py-1 lg:px-5 lg:pl-3 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                document
                  .getElementById("logo-sidebar")
                  .classList.toggle("-translate-x-full");

                setIsHovered(true);
              }}
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-300 rounded-lg sm:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200  "
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <NavLink
              to={token ? "/podcasts" : "/"}
              className="flex ms-2 items-center  md:me-24"
            >
              <img
                src={mainLogo}
                className="h-10 me-3 cursor-pointer"
                alt="Brand Logo"
              />
              <span className="self-center text-xl font-semibold sm:text-2xl  cursor-pointer whitespace-nowrap dark:text-white">
                <img src={logo} className="w-32" />
              </span>
            </NavLink>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
            <div className="flex relative  items-center ms-3">
              <div>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-2 focus:ring-text-color "
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                  onClick={(e) => {
                    e.stopPropagation();
                    let profile = document.getElementById("profile-menu");
                    const pro = profile.classList.value.includes("absolute");
                    if (pro) {
                      profile.classList.remove("absolute");
                      profile.classList.add("hidden");
                    } else {
                      profile.classList.add("absolute");
                      profile.classList.remove("hidden");
                    }
                  }}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 object-cover rounded-full"
                    src={
                      currentUser?.profilePic ||
                      "https://firebasestorage.googleapis.com/v0/b/podcast-application-react.appspot.com/o/default_pic%2Fvecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg?alt=media&token=4f0c367a-eaa7-44bb-9d87-3609fa380704"
                    }
                    alt="user photo"
                  />
                </button>
              </div>
              <div
                id="profile-menu"
                className={`z-50 top-[38px] w-48 -left-40 hidden   my-4 text-base list-none shadow-xl border-text-color bg-gray-800 backdrop-blur-2xl divide-y divide-gray-100 rounded shadow `}
              >
                <div className="bg-black/30 backdrop-blur-2xl">
                  {currentUser && (
                    <div className="px-4 py-3" role="none">
                      <p className="text-sm  dark:text-white" role="none">
                        {currentUser?.name}
                      </p>
                      <p
                        className="text-sm font-medium  truncate dark:text-gray-300"
                        role="none"
                      >
                        {currentUser?.email}
                      </p>
                    </div>
                  )}
                  {currentUser ? (
                    <ul className="" role="none">
                      <li>
                        <NavLink
                          to={`/profile/${currentUser?.uid}`}
                          className="block px-4 py-2  bg-[#252833] text-sm hover:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/podcasts"
                          className="block px-4 py-2  bg-[#252833] text-sm hover:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Podcasts
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/create-a-podcast"
                          className="block px-4 py-2  bg-[#252833] text-sm hover:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Create Podcast
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="/"
                          className="block px-4 py-2  bg-[#252833] text-sm hover:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
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
                    <ul className="" role="none">
                      <li>
                        <NavLink
                          to="/"
                          className="block px-4 py-2 bg-[#252833] text-sm text-text-color hover:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Login
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/signup"
                          className="block px-4 py-2  bg-[#252833] text-sm text-text-color hover:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
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
