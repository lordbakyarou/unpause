import PodcastPlayer from "../Components/PodcastPlayer";
import Episode from "../Components/Episods";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { db, storage, auth } from "../Firebase/firebase";
import {
  getDoc,
  doc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";

import { useSelector } from "react-redux";
import { selectPodcastById } from "../redux//features/podcast/podcastSlice";

import { IoMdAdd } from "react-icons/io";
import AddEpisodes from "../Components/AddEpisods";
import { useNavigate } from "react-router-dom";
import PodcastDetailLoading from "../Components/PodcastDetailLoading";

import { RiDeleteBin6Line } from "react-icons/ri";

import { HiOutlineDotsHorizontal } from "react-icons/hi";

const PodcastDetail = () => {
  const { uid, id } = useParams();
  const navigate = useNavigate();

  // const podcast = useSelector((state) => selectPodcastById(state, id));
  // console.log(podcast);

  const userInfo = useSelector((state) => state.user.user);

  const [podcast, setPodcast] = useState(null);
  const [isNewPodcastAdded, setIsNewPodcastAdded] = useState(false);

  const [createdBy, setCreatedBy] = useState("");
  const [userProfile, setUserProfile] = useState("");

  const [addPodcastOpen, setAddPodcastOpen] = useState(false);

  const [deleteIcon, setDeleteIcon] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const temp = await getDoc(doc(db, "users", uid));
        // console.log(temp.data(), "mcmmc");
        setCreatedBy(temp.data().name);
        setUserProfile(temp.data().profilePic);
      } catch (error) {
        console.log(error);
      }
    };

    getUserInfo();
  }, [uid]);

  useEffect(() => {
    const getPodcast = async () => {
      try {
        const temp = await getDoc(doc(db, "podcasts", uid, "podcast", id));
        // console.log(temp.data());
        setPodcast(temp.data());
      } catch (error) {
        console.log(error);
      }
    };

    getPodcast();
  }, [uid, id, isNewPodcastAdded]);

  const handleDeletePodcast = async () => {
    try {
      const docRef = doc(db, "podcasts", uid, "podcast", id);

      await deleteDoc(docRef);
      // console.log("done");
      navigate(`/profile/${uid}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <div
        className={`py-20 px-20 max-lg:px-20 pb-56 max-sm:px-4 bg-[#EDF3F7] dark:bg-transparent pb-40 w-full overflow-y-hidden flex justify-center flex-col gap-10`}
        onClick={(e) => {
          setDeleteIcon(false);
        }}
      >
        {!podcast && <PodcastDetailLoading />}
        {podcast && (
          <>
            <div className="relative">
              <div className="absolute top-10 flex justify-between left-2 flex flex justify-between items-center">
                <h1 className="text-xl dark:text-white text-black font-semibold max-sm:text-md backdrop-blur-lg">
                  Podcast Name : {podcast.podcastTitle}
                </h1>
              </div>
              <div className="absolute right-5 top-10">
                <div className="relative">
                  <p
                    className="text-2xl cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteIcon(!deleteIcon);
                    }}
                  >
                    {uid === userInfo?.uid && (
                      <HiOutlineDotsHorizontal className="dark:text-white  text-black" />
                    )}
                  </p>
                  {deleteIcon && uid === userInfo?.uid && (
                    <p
                      className="flex max-sm:flex-col right-20 bg-gray-200 items-center justify-center text-black p-2 mt-2 absolute right-4 rounded whitespace-nowrap max-sm:text-xs items-center gap-2"
                      onClick={handleDeletePodcast}
                    >
                      <RiDeleteBin6Line />{" "}
                      <span className="max-sm:w-10 max-sm:whitespace-pre-wrap cursor-pointer">
                        Delete Podcast
                      </span>
                    </p>
                  )}
                </div>
              </div>

              <div className="image w-full h-full flex flex-col items-center justify-start pt-4 ">
                <img
                  src={podcast.bannerImage}
                  className="w-full h-[300px] object-cover rounded-xl cursor-pointer"
                />
              </div>
              <div className="absolute bottom-1  right-2 w-full flex items-center gap-2 justify-end">
                <p className="w-fit cursor-pointer font-semibold text-sm text-black dark:text-white">
                  Created By: {createdBy}
                </p>
                <p
                  className="w-10 h-10 rounded-full dark:bg-transparent overflow-hidden border cursor-pointer transition-all hover:scale-[105%] duration-500"
                  onClick={() => navigate(`/profile/${podcast.uid}`)}
                >
                  <img src={userProfile} className="object-cover" />
                </p>
              </div>
            </div>
            <div className="flex w-full flex-row items-center gap-2">
              <p className="mr-2">Genres:</p>
              <div className="flex overflow-scroll whitespace-nowrap scrollbar-hide gap-2">
                {podcast.genres.map((item, index) => (
                  <p
                    key={index}
                    className="backdrop-blur-sm cursor-pointer hover:bg-white/40 bg-white dark:bg-white/30 rounded-xl p-2 text-sm"
                  >
                    #{item}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-10 dark:opacity-50 hover:opacity-100 transition-all hover:scale-[103%] duration-500 cursor-pointer text-gray-800 dark:text-white">
              <h1 className="">{podcast.podcastDescription}</h1>
            </div>

            <div className={`w-full flex flex-col gap-5 `}>
              <div className="flex flex-col gap-4">
                <div className="flex  justify-between items-center">
                  <p className="text-3xl">Episodes</p>
                  {uid === userInfo?.uid && (
                    <div
                      className="flex gap-2 items-center"
                      onClick={() => setAddPodcastOpen(true)}
                    >
                      <IoMdAdd className="transition-all hover:scale-[120%] duration-500 cursor-pointer  cursor-pointer text-2xl  " />
                      <p className="cursor-pointer">Create Episodes</p>
                    </div>
                  )}
                </div>
                {/* {console.log(podcast)} */}
                {podcast.episodes?.map((episode, index) => {
                  return (
                    <Episode
                      episode={episode}
                      key={index}
                      index={index}
                      setPodcast={setPodcast}
                      podcastDetail={podcast.episodes}
                    />
                  );
                })}
              </div>
              {/* need to chang ethis */}
            </div>
            {addPodcastOpen && (
              <div
                className="w-screen overflow-hidden absolute left-0 top-0 flex items-center "
                style={{
                  zIndex: "99",
                }}
              >
                <AddEpisodes
                  setAddPodcastOpen={setAddPodcastOpen}
                  setIsNewPodcastAdded={setIsNewPodcastAdded}
                  isNewPodcastAdded={isNewPodcastAdded}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PodcastDetail;
