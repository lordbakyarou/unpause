import { CiImageOn } from "react-icons/ci";
import { BsArrowClockwise } from "react-icons/bs";

import { MdOutlineCancel } from "react-icons/md";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { openPost, closePost } from "../redux/features/editpost/editPostOpen";

import { setCurrentUser } from "../redux/features/user/userSlice";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

import { db, storage, auth } from "../Firebase/firebase";

import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

import { updateDoc, doc } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";

import { toast } from "react-toastify";

function ForgotPassword({ setIsForgotPassword }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setIsForgotPassword(false);
    } catch (error) {
      console.log(error);
      if (error.message.includes("user-not-found")) {
        toast.error("Please enter correct email");
      } else if (error.message.includes("missing-email")) {
        toast.error("Please enter email");
      } else {
        toast.error("Internal server error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen w-full  backdrop-blur-sm pt-40  bg-black/30 flex  justify-center"
      onClick={(e) => {
        e.stopPropagation();
        setIsForgotPassword(false);
      }}
    >
      <div
        className=" flex max-xxs:w-[300px] h-fit  max-md:w-[400px] justify-center relative items-center flex-col gap-10 bg-black  backdrop-blur-xl rounded-lg p-5"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="absolute top-3 right-3 z-50">
          <RxCross1
            className="text-2xl cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();

              setIsForgotPassword(false);
            }}
          />
        </div>
        <h1 className="text-4xl max-sm:text-2xl max-xxs:text-xl font-semibold">
          Forgot Password
        </h1>
        <form
          className="flex flex-col items-center justify-center gap-5"
          autoComplete="off"
        >
          <>
            <div className="input-password  relative">
              <input
                placeholder="Email"
                name="email"
                className="peer outline-none bg-transparent p-3 rounded border w-[500px] max-xxs:w-[290px] max-md:w-[350px] placeholder-transparent"
                onChange={(e) => setEmail(e.target.value)}
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

          <div className="flex gap-4">
            <button
              className="border-2  rounded p-3 font-semibold  hover:bg-gray-200 hover:bg-opacity-20"
              onClick={(e) => {
                e.preventDefault();
                handleResetPassword();
              }}
            >
              {loading ? (
                <div className="flex gap-2 justify-center items-center">
                  <BsArrowClockwise className="animate-spin" />
                  Sending Mail
                </div>
              ) : (
                "Submit Email"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
