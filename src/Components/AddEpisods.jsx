import { CiImageOn } from "react-icons/ci";
import { BsArrowClockwise } from "react-icons/bs";

import { MdOutlineCancel } from "react-icons/md";
import { MdAudioFile } from "react-icons/md";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { openPost, closePost } from "../redux/features/editpost/editPostOpen";

import { setCurrentUser } from "../redux/features/user/userSlice";

import { db, storage, auth } from "../Firebase/firebase";

import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

import { updateDoc, doc, setDoc, arrayUnion } from "firebase/firestore";
import {
  EmailAuthProvider,
  sendEmailVerification,
  updateEmail,
  updatePassword,
} from "firebase/auth";

import {
  addPodcast,
  updatePodcast,
} from "../redux/features/podcast/podcastSlice";

import { toast } from "react-toastify";

import { v4 as uuidv4 } from "uuid";

function AddEpisodes({
  setAddPodcastOpen,
  setIsNewPodcastAdded,
  isNewPodcastAdded,
}) {
  const [editPassword, setEditPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uuid = uuidv4();

  const [loading, setLoading] = useState(false);

  const userInfo = useSelector((state) => state.user.user);

  const [fullname, setFullname] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);

  const [episodeName, setEpisodeName] = useState("");
  const [episodeDescription, setEpisodeDescription] = useState("");

  const [episodeImage, setEpisodeImage] = useState(null);
  const [audio, setAudio] = useState(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { uid, id } = useParams();
  // console.log(uid, id);

  const handleCreateEpisode = async () => {
    if (episodeImage && audio && episodeName && episodeDescription) {
    }

    if (!episodeImage) {
      toast.error("Please select episode image");
      return;
    }
    if (!audio) {
      toast.error("Please add episode audio");
      return;
    }
    if (!episodeName) {
      toast.error("Please give episode a name");
      return;
    }
    if (!episodeDescription) {
      toast.error("Please add episode description");
      return;
    }

    setLoading(true);
    try {
      let episodeImageUrl = "";
      let audioUrl = "";
      if (episodeImage) {
        const storageRef = ref(
          storage,
          `podcasts/${uid}/${id}/episodeImage/${uuid}`
        );

        await uploadBytes(storageRef, episodeImage);
        episodeImageUrl = await getDownloadURL(storageRef);
      }

      if (audio) {
        const storageRef = ref(
          storage,
          `podcasts/${uid}/${id}/episode/${uuid}`
        );

        await uploadBytes(storageRef, audio);

        audioUrl = await getDownloadURL(storageRef);
      }

      const podcastRef = doc(db, `podcasts/${uid}/podcast/${id}`);

      const newEpisode = {
        episodeName,
        episodeDescription,
        uid,
        podcastId: id,
        episodeId: uuid,
        episodeAudio: audioUrl,
        episodeImage: episodeImageUrl,
        episodeCreator: userInfo.name,
      };

      setIsNewPodcastAdded(!isNewPodcastAdded);

      await updateDoc(podcastRef, {
        episodes: arrayUnion(newEpisode),
      });

      toast.success("New Episode Created");
    } catch (error) {
      console.log(error);
      toast.success("Error while creating episode");
    } finally {
      dispatch(closePost());
      setLoading(false);
      setAddPodcastOpen(false);
    }
  };

  return (
    <div
      className="h-screen  w-full bg-black/30 flex items-center justify-center backdrop-blur-sm"
      onClick={(e) => {
        e.stopPropagation();
        setAddPodcastOpen(false);
      }}
    >
      <div
        className="overflow-y-hidden overflow-x-hidden max-sm:w-[500px] max-xxs:w-[290px] max-md:w-[350px] flex justify-center relative items-center flex-col gap-10 bg-black backdrop-blur-xl rounded-lg p-5"
        onClick={(e) => {
          e.stopPropagation();
          setAddPodcastOpen(true);
        }}
      >
        <div className="absolute top-3 right-3 z-50">
          <MdOutlineCancel
            className="text-2xl cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setAddPodcastOpen(false);
            }}
          />
        </div>
        <h1 className="text-4xl font-semibold max-sm:text-2xl max-xxs:text-xl">
          Add Episodes
        </h1>
        <form
          className="flex flex-col items-center justify-center gap-5"
          autoComplete="off"
        >
          <>
            <div className="input-password  relative">
              <input
                type="text"
                placeholder="Episodes Name"
                name="name"
                className="peer outline-none bg-transparent w-[500px] max-sm:w-[500px] max-xxs:w-[290px] max-md:w-[350px] p-3 rounded border w-[500px] placeholder-transparent"
                onChange={(e) => setEpisodeName(e.target.value)}
                value={episodeName}
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
                Episodes Name
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
                type="text"
                placeholder="Episodes Description"
                name="email"
                className="peer outline-none bg-transparent p-3 rounded border w-[500px] max-sm:w-[500px] max-xxs:w-[290px] max-md:w-[350px] placeholder-transparent"
                onChange={(e) => setEpisodeDescription(e.target.value)}
                value={episodeDescription}
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
                Episodes Description
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
          </>
          <label
            htmlFor="episodImage"
            className="block cursor-pointer outline-none flex gap-2 bg-transparent p-3 rounded border w-[500px] max-xxs:w-[300px]  max-md:w-[350px] "
          >
            <span className="text-gray-400 flex whitespace-nowrap gap-2 items-center">
              Select Episode Image
              <CiImageOn className="text-2xl" />
            </span>
            <input
              id="episodImage"
              type="file"
              className="hidden"
              onChange={(e) => setEpisodeImage(e.target.files[0])}
            />
            <p className="overflow-hidden truncate whitespace-nowrap w-[250px] max-sm">
              {episodeImage?.name}
            </p>
          </label>

          <label
            htmlFor="episodAudio"
            className="block cursor-pointer flex gap-2  outline-none bg-transparent p-3 rounded border w-[500px] max-sm:w-[500px] max-xxs:w-[290px] max-md:w-[350px] "
          >
            <span className="text-gray-400 flex whitespace-nowrap gap-2 items-center">
              Select Audio File
              <MdAudioFile className="text-2xl" />
            </span>
            <input
              id="episodAudio"
              type="file"
              accept="audio/mp3"
              className="hidden"
              onChange={(e) => setAudio(e.target.files[0])}
            />
            <p className="overflow-hidden truncate whitespace-nowrap w-[250px] max-sm">
              {audio?.name}
            </p>
          </label>

          <div className="flex gap-4">
            <button
              className="border-2  rounded p-3 font-semibold  hover:bg-gray-200 hover:bg-opacity-20"
              onClick={(e) => {
                e.preventDefault();
                handleCreateEpisode();
              }}
              // onClick={handleSignup}
            >
              {loading ? (
                <div className="flex gap-2 justify-center items-center">
                  <BsArrowClockwise className="animate-spin" />
                  Creating Episode
                </div>
              ) : (
                "Create New Episode"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEpisodes;
