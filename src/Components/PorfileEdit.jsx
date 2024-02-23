import { CiImageOn } from "react-icons/ci";
import { BsArrowClockwise } from "react-icons/bs";

import { MdOutlineCancel } from "react-icons/md";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { openPost, closePost } from "../redux/features/editpost/editPostOpen";

import { setCurrentUser } from "../redux/features/user/userSlice";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { db, storage, auth } from "../Firebase/firebase";

import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

import { updateDoc, doc } from "firebase/firestore";
import {
  EmailAuthProvider,
  sendEmailVerification,
  updateEmail,
  updatePassword,
} from "firebase/auth";

import { toast } from "react-toastify";

function ProfileEdit() {
  const [editPassword, setEditPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const userInfo = useSelector((state) => state.user.user);

  const [fullname, setFullname] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [imageUrl, setImageUrl] = useState(userInfo.profilePic);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [image, setImage] = useState(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUserUpdate = async () => {
    setLoading1(true);
    if (!editPassword) {
      try {
        let updatedImageUrl = imageUrl;

        if (image) {
          const storageRef = ref(storage, `profile/${userInfo.uid}`);

          await uploadBytes(storageRef, image);

          updatedImageUrl = await getDownloadURL(storageRef);
        }

        await updateDoc(doc(db, `users`, userInfo.uid), {
          name: fullname,
          email,
          uid: userInfo.uid,
          profilePic: updatedImageUrl,
        });

        await updateEmail(auth.currentUser, email);
        // await sendEmailVerification(auth.currentUser);

        dispatch(
          setCurrentUser({
            name: fullname,
            email,
            uid: userInfo.uid,
            profilePic: updatedImageUrl,
          })
        );

        setLoading1(false);

        navigate("/profile");
        toast.success("User successfully updated");
      } catch (error) {
        console.log(error);
        toast.error("User not updated");
      } finally {
        dispatch(closePost());
      }
    } else {
      setEditPassword(false);
      setLoading1(false);
    }
  };

  const handlePasswordUpdate = async () => {
    setLoading2(true);

    if (password != confirmPassword) {
      toast.error("Password do not match");
      setLoading2(false);
      return;
    }

    if (editPassword) {
      try {
        await updatePassword(auth.currentUser, password);
        setLoading2(false);
        toast.success("Password successfully updated");
      } catch (error) {
        console.log(error);
        setLoading2(false);
        toast.error("Password not updated");
      }
    } else {
      setEditPassword(true);
      setLoading2(false);
    }
  };

  return (
    <div
      className="h-full w-full backdrop-blur-sm  bg-black/30 flex items-center justify-center"
      onClick={(e) => {
        e.stopPropagation();
        dispatch(closePost());
      }}
    >
      <div
        className="overflow-y-hidden flex max-sm:w-[500px] max-xxs:w-[400px] justify-center relative items-center flex-col gap-10 bg-black backdrop-blur-xl rounded-lg p-5"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(openPost());
        }}
      >
        <div className="absolute top-3 right-3 z-50">
          <MdOutlineCancel
            className="text-2xl cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(closePost());
            }}
          />
        </div>
        <h1 className="text-4xl max-sm:text-2xl max-xxs:text-xl font-semibold">
          {editPassword ? "Update Password" : "Update Profile"}
        </h1>
        <form
          className="flex flex-col items-center justify-center gap-5"
          autoComplete="off"
        >
          {!editPassword && (
            <>
              <div className="input-password  relative">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  className="peer outline-none bg-transparent p-3 rounded border w-[500px] max-sm:w-[450px] max-xxs:w-[290px] placeholder-transparent"
                  onChange={(e) => setFullname(e.target.value)}
                  value={fullname}
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
                  className="peer outline-none bg-transparent p-3 rounded border w-[500px] max-sm:w-[450px] max-xxs:w-[290px] placeholder-transparent"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
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
            </>
          )}

          {editPassword && (
            <>
              <div className="input-password  relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  className="peer outline-none bg-transparent p-3 rounded border w-[500px] max-sm:w-[450px] max-xxs:w-[290px] placeholder-transparent"
                  onChange={(e) => setPassword(e.target.value)}
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
                {password && (
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
                  className="peer outline-none bg-transparent p-3 rounded border w-[500px] max-sm:w-[450px] max-xxs:w-[290px] placeholder-transparent"
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                {confirmPassword && (
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
            </>
          )}

          {!editPassword && (
            <label
              htmlFor="profilePic"
              className="block cursor-pointer outline-none bg-transparent p-3 rounded border w-[500px] max-sm:w-[450px] max-xxs:w-[290px]"
            >
              <span className="text-gray-400 flex gap-2 items-center">
                Profile Image
                <CiImageOn className="text-2xl" />
              </span>
              <input
                id="profilePic"
                type="file"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          )}

          <div className="flex gap-4">
            <button
              className="border-2  rounded p-3 font-semibold  hover:bg-gray-200 hover:bg-opacity-20"
              onClick={(e) => {
                e.preventDefault();
                handleUserUpdate();
              }}
              // onClick={handleSignup}
            >
              {loading1 ? (
                <div className="flex gap-2 justify-center items-center">
                  <BsArrowClockwise className="animate-spin" />
                  Updating Profile
                </div>
              ) : !editPassword ? (
                "Update Profile"
              ) : (
                "Edit Profile"
              )}
            </button>
            <button
              className="border-2  rounded p-3 font-semibold  hover:bg-gray-200 hover:bg-opacity-20"
              onClick={(e) => {
                e.preventDefault();
                handlePasswordUpdate();
              }}
              // onClick={handleSignup}
            >
              {loading2 ? (
                <div className="flex gap-2 justify-center items-center">
                  <BsArrowClockwise className="animate-spin" />
                  Updating Password
                </div>
              ) : editPassword ? (
                "Update Password"
              ) : (
                "Edit Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileEdit;
