import { NavLink } from "react-router-dom";

import { useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { clearToken } from "../redux/features/token/tokenSlice";
import { clearUser } from "../redux/features/user/userSlice";
import { clearPodcast } from "../redux/features/podcast/podcastSlice";
import { useEffect, useState } from "react";

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

  return (
    <div className={`${scrolled ? onScrollCode : onScrollUpCode}`}>
      {!scrolled && (
        <div
          className="w-[700px] max-lg:w-[500px] max-sm:w-[350px] max-sm:w-[250px] h-16 bg-blue-top z-10 absolute top-0 rounded-full"
          style={{
            filter: "blur(50px)",
          }}
        ></div>
      )}

      {console.log(token.token)}

      <div className="z-50 w-full max-sm:text-sm flex justify-center h-14 items-center max-lg:gap-10 gap-20 max-xxs:gap-5 text-lg">
        {!token.token && (
          <NavLink
            to={`${location.pathname === "/signup" ? "/" : "/signup"}`}
            className="opacity-50"
          >
            {location.pathname === "/signup" ? "Login" : "Signup"}
          </NavLink>
        )}

        <NavLink
          to={"/podcasts"}
          className={`${
            !token.token ? "pointer-events-none" : "pointer-events-auto"
          } opacity-50`}
        >
          Podcasts
        </NavLink>
        <NavLink
          to={"/create-a-podcast"}
          className={`${
            !token.token ? "pointer-events-none" : "pointer-events-auto"
          } opacity-50`}
        >
          Start A Podcast
        </NavLink>
        <NavLink
          to={`/profile/${currentUser?.uid}`}
          className={`${
            !token.token ? "pointer-events-none" : "pointer-events-auto"
          } opacity-50`}
        >
          Profile
        </NavLink>

        {token.token && (
          <NavLink
            to={"/"}
            className="opacity-50"
            onClick={() => {
              dispatch(clearToken());
              dispatch(clearUser());
              dispatch(clearPodcast());
            }}
          >
            Logout
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Navbar;
