import { useEffect, useState } from "react";
import { CiImageOn } from "react-icons/ci";

import { useNavigate } from "react-router-dom";

import { db, storage, auth } from "../Firebase/firebase";

import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux/features/user/userSlice";
import { setToken } from "../redux/features/token/tokenSlice";

import { BsArrowClockwise } from "react-icons/bs";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { toast } from "react-toastify";

import "firebase/firestore";

import { v4 } from "uuid";

const defaultPic =
  "https://firebasestorage.googleapis.com/v0/b/podcast-application-react.appspot.com/o/default_pic%2Fvecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg?alt=media&token=4f0c367a-eaa7-44bb-9d87-3609fa380704";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

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

  const handleSignup = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      console.log(image);

      if (image) {
        const storageRef = ref(storage, `profile/${user.uid}`);
        const imagethis = await uploadBytes(storageRef, image);

        const imageUrl = await getDownloadURL(storageRef);
        console.log(imagethis, imageUrl);

        // // Save user data along with the profile pic URL
        await setDoc(doc(db, "users", user.uid), {
          name,
          email,
          uid: user.uid,
          profilePic: imageUrl,
        });

        dispatch(
          setCurrentUser({
            name: name,
            email: email,
            uid: user.uid,
            profilePic: imageUrl,
          })
        );
      } else {
        // Save user data without profile pic URL
        await setDoc(doc(db, "users", user.uid), {
          name,
          email,
          uid: user.uid,
          profilePic: defaultPic,
        });

        dispatch(
          setCurrentUser({
            name: name,
            email: email,
            uid: user.uid,
            profilePic: defaultPic,
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

  return (
    <div className="pt-20 overflow-y-hidden flex justify-center items-center flex-col gap-10 bg-primary-background">
      <h1 className="text-4xl font-semibold">Signup</h1>
      <form
        className="flex flex-col items-center justify-center gap-5"
        autoComplete="off"
      >
        <div className="input-password  relative">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            className="peer outline-none bg-transparent p-3 rounded border w-[500px] placeholder-transparent"
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
            Full Name
          </label>
        </div>
        <div className="input-password  relative">
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="peer outline-none bg-transparent p-3 rounded border w-[500px] placeholder-transparent"
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
        </div>
        <div className="input-password  relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            className="peer outline-none bg-transparent p-3 rounded border w-[500px] placeholder-transparent"
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
        </div>
        <div className="input-password  relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            className="peer outline-none bg-transparent p-3 rounded border w-[500px] placeholder-transparent"
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
            Confirm Password
          </label>

          {user.confirmPassword && (
            <div
              className="absolute top-3.5 right-2 text-lg text-gray-800 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
          className="block cursor-pointer outline-none bg-transparent p-3 rounded border w-[500px] "
        >
          <span className="text-gray-400 flex gap-2 items-center">
            Add Profile Pic <CiImageOn className="text-2xl" />
          </span>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        <button
          className="border-2  rounded p-3 font-semibold w-[500px] hover:bg-gray-200 hover:bg-opacity-20"
          onClick={validateDetails}
        >
          {loading ? (
            <div className="flex gap-2 justify-center items-center">
              <BsArrowClockwise className="animate-spin" />
              Signing up...
            </div>
          ) : (
            "Signup Now"
          )}
        </button>
      </form>
      <p className="">
        <span className="opacity-50">Already Have An Account? </span>
        <span
          className="cursor-pointer opacity-50 hover:opacity-100 text-blue-top"
          onClick={() => navigate("/")}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Signup;
