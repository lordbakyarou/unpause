import { useEffect, useState } from "react";
import { CiImageOn } from "react-icons/ci";

import { useNavigate } from "react-router-dom";

import { db, storage, auth } from "../Firebase/firebase";

import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";

import googleAuth from "../assets/google.png";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux/features/user/userSlice";
import { setToken } from "../redux/features/token/tokenSlice";

import { BsArrowClockwise } from "react-icons/bs";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import loginImage from "../assets/signup.jpeg";

import { toast } from "react-toastify";

import "firebase/firestore";

import { v4 } from "uuid";

const defaultPic =
  "https://firebasestorage.googleapis.com/v0/b/podcast-application-react.appspot.com/o/default_pic%2Fvecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg?alt=media&token=4f0c367a-eaa7-44bb-9d87-3609fa380704";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.token.tokenn);

  const [image, setImage] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [imageList, setImageList] = useState([]);

  const [userCreationError, setUserCreationError] = useState(null);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = user;

  function setUserProperties(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function signinUsingGoogle(e) {
    e.preventDefault();

    try {
      const provider = await new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });
      const user = await signInWithPopup(auth, provider);
      user.user.password = "xmz@123Hannssjes)";
      await handleGoogleSignup(user.user);
    } catch (error) {
      console.error(error);
    }
  }

  const validateDetails = (e) => {
    e.preventDefault();
    if (name === "") {
      toast.error("Please enter your name");
    } else if (email === "") {
      toast.error("Please enter your email");
    } else if (password === "") {
      toast.error("Please enter your password");
    } else if (password <= 8) {
      toast.error("Password must be greater than 8");
    } else if (password != confirmPassword) {
      toast.error("Confirm password does not match");
    } else {
      handleSignup();
    }
  };

  const handleGoogleSignup = async (googleUser) => {
    try {
      const userDocRef = doc(db, "users", googleUser.uid);
      const userDoc = await getDoc(userDocRef);

      const resizedProfilePic = googleUser.photoURL.replace("s96-c", "s400-c");

      if (userDoc.exists()) {
        throw new Error("User already exists. Please log in.");
      }

      await setDoc(userDocRef, {
        name: googleUser.displayName,
        email: googleUser.email,
        uid: googleUser.uid,
        profilePic: resizedProfilePic,
        likes: [],
      });

      dispatch(
        setCurrentUser({
          name: googleUser.displayName,
          email: googleUser.email,
          uid: googleUser.uid,
          profilePic: resizedProfilePic,
          likes: [],
        })
      );

      dispatch(setToken(googleUser.accessToken));

      navigate("/podcasts");
      toast.success("Account created successfully");
    } catch (error) {
      if (error.message.includes("User already exists")) {
        toast.error("User already exists. Please log in.");
      } else {
        toast.error("Invalid account details.");
      }
      console.log(error.message);
    }
  };

  const handleSignup = async (googleUser) => {
    setLoading(true);
    try {
      let userCredential;

      userCredential = await createUserWithEmailAndPassword(
        auth,
        email || googleUser?.email,
        password || googleUser?.password
      );

      const user = userCredential.user;

      if (image) {
        const storageRef = ref(storage, `profile/${user.uid}`);
        const imagethis = await uploadBytes(storageRef, image);

        const imageUrl = await getDownloadURL(storageRef);

        // // Save user data along with the profile pic URL
        await setDoc(doc(db, "users", user.uid), {
          name: name || googleUser.displayName,
          email: email || googleUser.email,
          uid: user.uid || googleUser.uid,
          profilePic: imageUrl || googleUser.photoURL,
          likes: [],
        });

        dispatch(
          setCurrentUser({
            name: name || googleUser.displayName,
            email: email || googleUser.email,
            uid: user.uid || user.uid || googleUser.uid,
            profilePic: imageUrl || googleUser.photoURL,
            likes: [],
          })
        );
      } else {
        // Save user data without profile pic URL
        await setDoc(doc(db, "users", user.uid), {
          name,
          email,
          uid: user.uid,
          profilePic: defaultPic,
          likes: [],
        });

        dispatch(
          setCurrentUser({
            name: name,
            email: email,
            uid: user.uid,
            profilePic: defaultPic,
            likes: [],
          })
        );
      }

      // console.log(user);

      dispatch(setToken(user.accessToken));

      navigate("/podcasts");
      setLoading(false);
      toast.success("Account created");
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      toast.error("Invalid account details");
    }
    // console.log(email, password);
  };

  // console.log(image);

  useEffect(() => {
    if (token) {
      navigate("/podcasts");
    }
  }, [token]);

  return (
    <div class="font-[sans-serif] md:h-screen">
      <div class="grid md:grid-cols-2 items-center gap-8 h-full ">
        <div class="max-md:order-1 p-4">
          <img
            src={loginImage}
            class="lg:max-w-[85%] w-full h-full object-contain block mx-auto"
            alt="login-image"
          />
        </div>
        <div className="p-4 ">
          <div className="max-md:pt-20 overflow-y-hidden flex justify-center items-center flex-col gap-10 ">
            <div className="flex flex-col gap-2 items-center dark:border-none  sm:p-5 dark:bg-transparent bg-white shadow-md">
              <h1 className="text-4xl max-md:text-2xl font-semibold">Signup</h1>
              <form
                className="flex flex-col items-center justify-center gap-5"
                autoComplete="off"
              >
                <div className="input-password relative">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    className="peer outline-none dark:bg-transparent bg-white p-3 max-md:p-2 rounded dark:border dark:border-gray-100 border-gray-300 border w-[450px] max-xl:w-[300px] max-md:w-[350px] max-sm:w-[450px] max-xxs:w-[290px]  placeholder-transparent"
                    onChange={(e) => setUserProperties(e)}
                  />
                  <label
                    className="absolute
                 transition-all
                  left-3.5 -top-0
                   text-gray-400 
                   text-xs peer-placeholder-shown:text-sm
                   max-md:peer-placeholder-shown:text-xs
                    peer-placeholder-shown:top-3.5
                    pointer-events-none"
                  >
                    Full Name
                  </label>
                </div>
                <div className="input-password relative">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="peer outline-none dark:bg-transparent bg-white p-3 max-md:p-2 rounded dark:border dark:border-gray-100 border-gray-300 border  w-[450px] max-xl:w-[300px] max-md:w-[350px] max-sm:w-[450px] max-xxs:w-[290px] placeholder-transparent"
                    onChange={(e) => setUserProperties(e)}
                  />
                  <label
                    className="absolute
                 transition-all
                  left-3.5 -top-0
                   text-gray-400 
                   text-xs peer-placeholder-shown:text-sm
                   max-md:peer-placeholder-shown:text-xs
                    peer-placeholder-shown:top-3.5
                    pointer-events-none"
                  >
                    Email
                  </label>
                </div>
                <div className="input-password  relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    className="peer outline-none dark:bg-transparent bg-white p-3 max-md:p-2 rounded dark:border dark:border-gray-100 border-gray-300 border   w-[450px] max-xl:w-[300px] max-md:w-[350px] max-sm:w-[450px] max-xxs:w-[290px] placeholder-transparent"
                    onChange={(e) => setUserProperties(e)}
                  />
                  <label
                    className="absolute
                 transition-all
                  left-3.5 -top-0
                   text-gray-400 
                   text-xs peer-placeholder-shown:text-sm
                   max-md:peer-placeholder-shown:text-xs
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
                </div>
                <div className="input-password  relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    className="peer outline-none dark:bg-transparent bg-white p-3 max-md:p-2 rounded dark:border dark:border-gray-100 border-gray-300 border   w-[450px] max-xl:w-[300px] max-md:w-[350px] max-sm:w-[450px] max-xxs:w-[290px] placeholder-transparent"
                    onChange={(e) => setUserProperties(e)}
                  />
                  <label
                    className="absolute
                 transition-all
                  left-3.5 -top-0
                   text-gray-400 
                   text-xs peer-placeholder-shown:text-sm
                   max-md:peer-placeholder-shown:text-xs
                    peer-placeholder-shown:top-3.5
                    pointer-events-none"
                  >
                    Confirm Password
                  </label>

                  {user.confirmPassword && (
                    <div
                      className="absolute top-3.5 right-2 text-lg text-gray-800 cursor-pointer"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <IoMdEyeOff className="text-white" />
                      ) : (
                        <IoMdEye className="text-white" />
                      )}
                    </div>
                  )}
                </div>

                <label
                  htmlFor="fileInput"
                  className="block cursor-pointer outline-none flex gap-2 bg-transparent p-3 max-md:p-2 rounded dark:border dark:border-gray-100 border-gray-300 border   w-[450px] max-xl:w-[300px] max-md:w-[350px] max-sm:w-[450px] max-xxs:w-[290px] "
                >
                  <span className="text-gray-400 flex whitespace-nowrap gap-2 items-center">
                    Add Profile Pic <CiImageOn className="text-2xl" />
                  </span>
                  <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <p className="overflow-hidden truncate whitespace-nowrap w-[250px] max-sm">
                    {image?.name}
                  </p>
                </label>
                <button
                  className="dark:border dark:border-gray-100 border-gray-300 border bg-[#72C199] rounded p-3 max-md:p-2 font-semibold w-[480px] max-sm:w-[450px] max-xl:w-[300px] max-xxs:w-[290px] max-md:w-[350px] bg-opacity-90 hover:bg-opacity-100"
                  onClick={validateDetails}
                >
                  {loading ? (
                    <div className="flex gap-2  text-white justify-center items-center">
                      <BsArrowClockwise className="animate-spin" />
                      Signing up...
                    </div>
                  ) : (
                    <p className="text-white">Signup Now</p>
                  )}
                </button>
                <button
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                  // onClick={loginUsingGoogle}
                  className="flex items-center justify-center  rounded p-3 max-md:p-2 font-semibold"
                  onClick={signinUsingGoogle}
                >
                  {/* <IconButton> */}
                  <img src={googleAuth} alt="Your Image" width={20} />
                  {/* </IconButton> */}
                  <p className="">Signup using Google</p>
                </button>
              </form>
              <p className="">
                <span className="opacity-50 text-sm">
                  Already Have An Account?{" "}
                </span>
                <span
                  className="cursor-pointer opacity-50 hover:opacity-100 text-green-400 font-semibold"
                  onClick={() => navigate("/")}
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
