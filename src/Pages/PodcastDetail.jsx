import PodcastPlayer from "../Components/PodcastPlayer";
import Episode from "../Components/Episods";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { db, storage, auth } from "../Firebase/firebase";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";

import { useSelector } from "react-redux";
import { selectPodcastById } from "../redux//features/podcast/podcastSlice";

import { IoMdAdd } from "react-icons/io";
import AddEpisodes from "../Components/AddEpisods";
import { useNavigate } from "react-router-dom";
import PodcastDetailLoading from "../Components/PodcastDetailLoading";

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

  return (
    <div
      className={`py-5 px-20 pb-56 max-sm:px-4 pb-40 w-full overflow-y-hidden flex justify-center flex-col gap-10 bg-primary-background backdrop-blur-sm `}
    >
      {!podcast && <PodcastDetailLoading />}
      {podcast && (
        <>
          <div className="flex flex-col gap-10 ">
            <h1 className="text-3xl">Podcast Name : {podcast.podcastTitle}</h1>
          </div>

          <div className="image w-full h-full flex flex-col items-center justify-start pt-4 ">
            <img
              src={podcast.bannerImage}
              className="w-full h-[350px] object-cover rounded-2xl cursor-pointer transition-all hover:scale-105 duration-500"
            />
          </div>
          <div className=" w-full flex  items-center  gap-2 justify-end">
            <p className="w-fit cursor-pointer opacity-50 hover:opacity-100 ">
              Created By: {createdBy}
            </p>
            <p
              className="w-10 h-10 rounded-full bg-transparent overflow-hidden border  cursor-pointer transition-all hover:scale-[110%] duration-500"
              onClick={() => navigate(`/profile/${podcast.uid}`)}
            >
              <img src={userProfile} />
            </p>
          </div>

          <div className="flex w-full flex-row items-center gap-2">
            <p className="mr-2">Genres:</p>
            <div className="flex overflow-scroll whitespace-nowrap scrollbar-hide gap-2">
              {podcast.genres.map((item, index) => (
                <p
                  key={index}
                  className="backdrop-blur-sm cursor-pointer hover:bg-white/40 bg-white/30 rounded-xl p-2 text-sm"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-10 opacity-50 hover:opacity-100 transition-all hover:scale-[103%] duration-500 cursor-pointer">
            <h1 className="">{podcast.description}</h1>
          </div>

          <div className={`w-full flex flex-col gap-5 `}>
            <div className="flex flex-col gap-4">
              <div className="flex  justify-between items-center">
                <p className="text-3xl">Episodes</p>
                {uid === userInfo.uid && (
                  <div
                    className="flex gap-2 items-center"
                    onClick={() => setAddPodcastOpen(true)}
                  >
                    <IoMdAdd className="transition-all hover:scale-[120%] duration-500 cursor-pointer  cursor-pointer text-2xl  " />
                    <p className="cursor-pointer">Create Episods</p>
                  </div>
                )}
              </div>
              {/* {console.log(podcast)} */}
              {podcast.episodes?.map((episode, index) => {
                return <Episode episode={episode} key={index} index={index} />;
              })}
            </div>
            {/* need to chang ethis */}
          </div>
          {addPodcastOpen && (
            <div className="w-screen h-screen overflow-hidden absolute left-0 top-0 flex items-center justify-center">
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
  );
};

export default PodcastDetail;
