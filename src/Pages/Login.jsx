import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { db, storage, auth } from "../Firebase/firebase";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";

import { signInWithEmailAndPassword } from "firebase/auth";

import { BsArrowClockwise } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/features/token/tokenSlice";
import { setCurrentUser } from "../redux/features/user/userSlice";
import { addPodcast } from "../redux/features/podcast/podcastSlice";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import ForgotPassword from "../Components/ForgotPassword";

import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState("");

  const [loading, setLoading] = useState(false);

  function setUserProperties(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loggedInUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = loggedInUser.user;
      // console.log(user);

      dispatch(setToken(user.accessToken));

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        dispatch(setCurrentUser(userData));
      }

      const podcastsCollectionRef = collection(
        db,
        "podcasts",
        user.uid,
        "podcast"
      );

      const querySnapshot = await getDocs(podcastsCollectionRef);

      querySnapshot.forEach((doc) => {
        dispatch(addPodcast(doc.data()));
      });

      navigate("/podcasts");

      setLoading(false);
      toast.success("Login successful!");
    } catch (error) {
      console.log(error);

      setLoading(false);
      toast.error("Login error please check your login details");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/podcasts");
    }
  }, [token]);

  return (
    <div class="p-4 sm:ml-64">
      <div className="pt-20 overflow-y-hidden flex justify-center items-center flex-col gap-10 ">
        <h1 className="text-4xl font-semibold">Login</h1>
        <form
          className="flex flex-col items-center justify-center gap-5"
          autoComplete="off"
        >
          <div className="input-password  relative">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="peer outline-none bg-transparent p-3 rounded border w-[480px] max-sm:w-[450px] max-xxs:w-[290px] max-md:w-[350px] placeholder-transparent"
              onChange={(e) => setUserProperties(e)}
            />
            <label
              className="absolute
             transition-all
              left-3.5 -top-0
               text-gray-400 
               text-xs peer-placeholder-shown:text-sm
                peer-placeholder-shown:top-3.5
                pointer-events-none"
            >
              Email
            </label>
            {/* 
              {loginInUser.password && (
                <div
                  className="absolute top-2.5 right-2 text-lg text-gray-800 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              )} */}
          </div>
          <div className="input-password  relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              className="peer outline-none bg-transparent p-3 rounded border w-[480px] max-sm:w-[450px] max-xxs:w-[290px] max-md:w-[350px] placeholder-transparent"
              onChange={(e) => setUserProperties(e)}
            />
            <label
              className="absolute
             transition-all
              left-3.5 -top-0
               text-gray-400 
               text-xs peer-placeholder-shown:text-sm
                peer-placeholder-shown:top-3.5
                pointer-events-none"
            >
              Password
            </label>
            {user.password && (
              <div
                className="absolute top-3.5 right-2 text-lg text-gray-800 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoMdEyeOff className="text-white" />
                ) : (
                  <IoMdEye className="text-white" />
                )}
              </div>
            )}
            <div className="text-xs flex w-full justify-end ">
              <p
                className="cursor-pointer w-fit opacity-50 hover:opacity-100"
                onClick={() => setIsForgotPassword(true)}
              >
                Forgot Password?
              </p>
            </div>
          </div>

          <button
            className="border-2  rounded p-3 font-semibold w-[480px] max-sm:w-[450px] max-xxs:w-[290px] max-md:w-[350px] hover:bg-gray-200 hover:bg-opacity-20"
            onClick={handleLogin}
          >
            {loading ? (
              <div className="flex gap-2 justify-center items-center">
                <BsArrowClockwise className="animate-spin" />
                Loging up...
              </div>
            ) : (
              "Login Now"
            )}
          </button>
        </form>
        <p className="">
          <span className="opacity-50">Don't Have An Account? </span>
          <span
            className="cursor-pointer opacity-50 hover:opacity-100 text-blue-top"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </div>
      {isForgotPassword && (
        <div
          className="w-screen sm:pl-64  overflow-hidden absolute left-0 top-0 flex items-center justify-center"
          style={{
            zIndex: "99",
          }}
        >
          <ForgotPassword setIsForgotPassword={setIsForgotPassword} />
        </div>
      )}
    </div>
  );
}

export default Login;
