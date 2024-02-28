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

function Card({ podcastDetails, podcast }) {
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const likedPodcast = currentUser.likes?.find(
      (item) => item.id === podcast.podcastId
    );
    if (likedPodcast === undefined) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
    }
  }, []);

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
      className="w-80 relative max-md:w-80 max-md:h-fit h-[510px] max-sm:w-56 max-lg:w-60 pt-[0px] max-sm:pt-0 max-xxs:w-full max-xxs:p-2  max-xxs:h-fit  max-lg:h-full max-sm:h-full drop-shadow-lg  rounded-2xl flex flex-col gap-2 justify-between max-lg:justify-evenly max-sm:justify-evenly "
      style={{
        backgroundImage:
          "linear-gradient(rgba(58, 129, 191, 0.3), rgba(65, 48, 90, 0.3))",
      }}
    >
      <div className="image overflow-hidden pt-2  w-full h-fit flex flex-col items-center justify-start  max-sm:pt-0 ">
        <img
          src={podcastDetails.img}
          className="w-[306px] max-md:w-[306px] max-md:h-72 h-72 max-xxs:w-screen max-xxs:p-0 max-xxs:h-40  object-cover rounded-t-2xl cursor-pointer transition-all hover:scale-105 duration-500 max-lg:w-64 max-lg:h-40 max-sm:w-64 max-sm:h-40"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/podcast/${podcast.uid}/${podcast.podcastId}`);
          }}
        />

        <div
          className="absolute top-3 right-3 group p-1 text-xl"
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
      <div className="flex flex-col gap-2 flex-grow">
        <div className="flex justify-between px-4 items-center text-primary-text-color ">
          <p className="w-fit max-sm:text-lg overflow-hidden  hover:opacity-100 cursor-pointer">
            {podcastDetails.podcastName}
          </p>
          <CiPlay1
            className="hover:fill-text-color group cursor-pointer cursor-pointer transition-all hover:scale-150 duration-500"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/podcast/${podcast.uid}/${podcast.podcastId}`);
            }}
          />
        </div>
        <div className="flex justify-between px-4 items-center text-primary-text-color">
          <p className="w-fit max-sm:text-sm text-sm max-h-20 overflow-scroll scrollbar-hide opacity-50 hover:opacity-100 cursor-pointer">
            {podcast?.podcastDescription}
          </p>
        </div>
        <div className="flex px-4 items-center  whitespace-nowrap flex-wrap scrollbar-hide text-primary-text-color">
          {podcast?.genres?.length >= 0 &&
            podcast.genres.map((genre, index) => {
              if (index > 2) {
                return;
              } else
                return (
                  <span
                    key={index}
                    class="inline-block w-fit bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    #{genre}
                  </span>
                );
            })}
        </div>
      </div>
    </div>
  );
}

export default Card;
