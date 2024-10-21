import { CiPlay1 } from "react-icons/ci";

import { useNavigate } from "react-router-dom";

import { FaPlay } from "react-icons/fa";

import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux/features/user/userSlice";

import { db, storage, auth } from "../Firebase/firebase";
import {
  getDoc,
  doc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";
import { setEpisode } from "../redux/features/episods/episodsSlice";
import { playMusic } from "../redux/features/music/musicSlice";
import { toast } from "react-toastify";

function UpdatedCard({ podcastDetails, podcast }) {
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [isLiked, setIsLiked] = useState(false);
  const [hovered, setHovered] = useState(false); // State to track hover

  useEffect(() => {
    const likedPodcast = currentUser?.likes?.find(
      (item) => item.id === podcast.podcastId
    );
    if (likedPodcast === undefined) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
    }
  }, []);

  const playEpisode = () => {
    if (podcast.episodes.length == 0) {
      toast.error("This podcast has no songs");
    } else {
      dispatch(setEpisode({ episodes: podcast.episodes, index: 0 }));
      dispatch(playMusic());
    }
  };

  const handleLike = async () => {
    setIsLiked(!isLiked);
    try {
      const userRef = doc(db, "users", currentUser.uid);
      const getCurrentUser1 = await getDoc(userRef);
      const currentLikedData = getCurrentUser1.data().likes || []; // Ensure currentLikedData is initialized

      const likedPodcastIndex = currentLikedData.findIndex(
        (item) => item.id === podcast.podcastId
      );

      if (likedPodcastIndex === -1) {
        // Podcast not liked, add it
        const newLikedPodcast = { uid: podcast.uid, id: podcast.podcastId };
        const updatedLikes = [...currentLikedData, newLikedPodcast];
        await updateDoc(userRef, { likes: updatedLikes });

        dispatch(setCurrentUser({ ...currentUser, likes: updatedLikes }));
      } else {
        // Podcast already liked, remove it
        const updatedLikes = currentLikedData.filter(
          (item) => item.id !== podcast.podcastId
        );

        await updateDoc(userRef, { likes: updatedLikes });

        dispatch(setCurrentUser({ ...currentUser, likes: updatedLikes }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`relative transition-transform duration-300 ease-in-out bg-black`}
      style={{
        width: "200px", // Fixed width
        height: "300px", // Fixed height
        transform: hovered ? "scale(1.3)" : "scale(1)", // Scaling on hover
        transformOrigin: "center", // Scale from the center
        zIndex: hovered ? 10 : 1, // Higher z-index when hovered
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute top-0 z-40 image w-full h-full overflow-hidden flex flex-col items-center justify-start max-sm:pt-0">
        <img
          src={podcastDetails.img}
          className="w-full h-full object-cover cursor-pointer "
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/podcast/${podcast.uid}/${podcast.podcastId}`);
          }}
        />
      </div>

      {hovered && (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-b from-transparent to-black z-50 p-4 transition-all duration-300 ease-in-out flex flex-col ">
          {/* User Image */}

          <div className="flex justify-between mb-2">
            <div
              className="w-full flex cursor-pointer hover:bg-gray-200 text-xs font-semibold flex-wrap items-center gap-1 justify-center rounded bg-white text-black"
              onClick={playEpisode}
            >
              <FaPlay className="text-[7px]" />
              Play
            </div>
            <div
              className=" right-3 group p-1 text-lg"
              onClick={() => handleLike()}
            >
              {!isLiked ? (
                <FaRegHeart className=" cursor-pointer transition-all hover:scale-110 duration-500 text-white" />
              ) : (
                <FaHeart className="text-red-500 cursor-pointer transition-all hover:scale-110 duration-500 " />
              )}
              <p
                className={`text-white bg-black px-1 text-xs absolute top-8 ${
                  !isLiked ? "right-0" : "-right-2"
                } hidden group-hover:block rounded`}
              >
                {!isLiked ? "Like" : "Dislike"}
              </p>
            </div>
          </div>
          <div className="font-semibold text-sm text-white my-1">
            {podcast.podcastTitle}
          </div>

          <div className=" flex flex-wrap gap-1 font-semibold text-[10px] text-gray-300 ">
            {podcast?.genres?.map((genre, index) => (
              <div key={index}>
                {genre} {index != podcast.genres.length - 1 ? "•" : ""}
              </div>
            ))}
          </div>
          <div className="text-[10px] h-10 overflow-scroll text-gray-400 font-semibold">
            {podcast.podcastDescription}
          </div>
        </div>
      )}
      {!hovered && (
        <div className="absolute bottom-0 left-0 w-full z-50 p-2 bg-gradient-to-t from-black via-transparent to-transparent text-white">
          {/* Song name */}
          <div className="w-full text-center">
            <span className="text-sm font-bold uppercase font-mono">
              {podcastDetails.podcastName}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdatedCard;
