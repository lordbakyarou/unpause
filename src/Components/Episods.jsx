import { IoPlayCircleOutline, IoPauseCircleOutline } from "react-icons/io5";

import { useSelector, useDispatch } from "react-redux";
import {
  setEpisode,
  clearEpisode,
} from "../redux/features/episods/episodsSlice";

import { playMusic } from "../redux/features/music/musicSlice";

import { pauseMusic } from "../redux/features/music/musicSlice";
import { RiDeleteBin6Line } from "react-icons/ri";

import { db, storage, auth } from "../Firebase/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useEffect } from "react";

import defaultEpisode from "../assets/defaultEpisode.png";

function Episode({ episode, index, setPodcast, podcastDetail }) {
  const dispatch = useDispatch();

  const currentEpisode = useSelector((state) => state.episode);
  const user = useSelector((state) => state.user.user);

  const music = useSelector((state) => state.music);
  // console.log(podcastDetail, "in episodes page");

  const playEpisode = () => {
    dispatch(setEpisode({ episodes: podcastDetail, index }));
    // console.log(podcastDetail);
    dispatch(playMusic());
  };

  const deleteEpisode = async () => {
    try {
      const docPath = `/podcasts/${episode.uid}/podcast/${episode.podcastId}`;

      // Get the document
      const docRef = doc(db, docPath);
      const docSnapshot = await getDoc(docRef);

      // Check if the document exists
      if (docSnapshot.exists()) {
        // Get the data
        const data = docSnapshot.data();

        // Remove the element from the array
        if (data.episodes && Array.isArray(data.episodes)) {
          data.episodes.splice(index, 1); // Remove 1 element at index
        }

        // Update the document with the modified array
        await updateDoc(docRef, {
          episodes: data.episodes,
        });

        const podcast = await getDoc(docRef);

        setPodcast(podcast.data());
      } else {
        toast.error("Podcast does not exist.");
      }

      if (
        currentEpisode?.episode?.episodes[currentEpisode?.episode?.index]
          .episodeId === episode.episodeId
      ) {
        dispatch(clearEpisode());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    episode && (
      <div className="flex pl-2 gap-3">
        {index + 1}.
        <img
          src={episode.episodeImage || defaultEpisode}
          className="object-cover w-20 h-20"
        />
        <div className="">
          <p className="text-lg">{episode.episodeName}</p>
          <p className=" text-sm opacity-50 w-fit hover:opacity-100 transition-all hover:scale-[101%] duration-500 cursor-pointer">
            {episode.episodeDescription}
          </p>
          <div className="rounded w-fit flex gap-2 items-center cursor-pointer">
            <p onClick={playEpisode} className="text-sm">
              {music.status &&
              currentEpisode?.episode?.episodes[currentEpisode?.episode?.index]
                .episodeId === episode.episodeId
                ? "Pause"
                : "Play"}
            </p>
            {music.status &&
            currentEpisode?.episode?.episodes[currentEpisode?.episode?.index]
              .episodeId === episode.episodeId ? (
              <IoPauseCircleOutline
                onClick={() => dispatch(pauseMusic())}
                className="text-2xl transition-all hover:scale-[120%] duration-500 cursor-pointer"
              />
            ) : (
              <IoPlayCircleOutline
                onClick={playEpisode}
                className="text-2xl transition-all hover:scale-[120%] duration-500 cursor-pointer"
              />
            )}
            {user?.uid === episode?.uid && (
              <div className="flex items-center gap-2" onClick={deleteEpisode}>
                Delete <RiDeleteBin6Line />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default Episode;
