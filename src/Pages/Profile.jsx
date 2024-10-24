import { IoIosLogOut } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from "../Components/Card";
import ProfileEdit from "../Components/PorfileEdit";

import { db, storage, auth } from "../Firebase/firebase";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";

import { clearToken } from "../redux/features/token/tokenSlice";
import { clearUser } from "../redux/features/user/userSlice";
import { clearPodcast } from "../redux/features/podcast/podcastSlice";

import { openPost, closePost } from "../redux/features/editpost/editPostOpen";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { clearEpisode } from "../redux/features/episods/episodsSlice";

import { toast } from "react-toastify";
import UpdatedCard from "../Components/UpdatedCard";

function Profile() {
  const [user, setUser] = useState(null);
  const currentUser = useSelector((state) => state.user.user);
  // const userPodcast = useSelector((state) => state.podcast.podcast);
  const navigate = useNavigate();

  const [userPodcast, seUserPodcast] = useState(null);

  let { uid } = useParams();

  // console.log(uid, "user uid");

  const isPostOpen = useSelector((state) => state.editPost);

  const dispatch = useDispatch();

  const handleEditProfile = () => {
    // console.log("handleedit");
    dispatch(openPost());
  };

  const token = useSelector((state) => state.token.token);

  useEffect(() => {
    if (!token) {
      navigate("/");
      toast.error("You must first login");
      return;
    }

    async function getUsersDetail() {
      const userDetail = await getDoc(doc(db, "users", uid));
      setUser(userDetail.data());
    }

    getUsersDetail();
  }, [uid]);

  useEffect(() => {
    if (!token) {
      navigate("/");
      // console.log("hihihihi");
      toast.error("You must first login");
      return;
    }

    async function getUsersPodcastDetail() {
      const podcastsCollectionRef = collection(db, "podcasts", uid, "podcast");

      const querySnapshot = await getDocs(podcastsCollectionRef);
      const newArray = [];
      querySnapshot.forEach((doc) => newArray.push(doc.data()));

      seUserPodcast(newArray);
    }

    getUsersPodcastDetail();
  }, [uid]);

  return (
    <div className="p-4">
      <div className="pt-20 w-full pb-40 overflow-y-hidden flex justify-center items-center flex-col gap-10">
        <div className="flex flex-col gap-10 items-center ">
          <h1 className="text-2xl">Profile</h1>
        </div>
        <div className="w-80 h-[350px] relative flex flex-col gap-2 justify-between dark:bg-black/60 bg-white/30">
          <div className="image w-full h-full flex flex-col items-center justify-start  ">
            <img
              src={
                user?.uid === currentUser?.uid
                  ? currentUser?.profilePic
                  : user?.profilePic
              }
              className="w-[350px] h-72 object-cover  cursor-pointer transition-all hover:scale-105 duration-500"
            />
          </div>
          <div className="flex justify-between px-7 pb-10 items-center text-primary-text-color">
            <p className="w-fit  overflow-hidden opacity-50 hover:opacity-100 dark:text-gray-200 text-gray-800 cursor-pointer">
              {user?.uid === currentUser?.uid ? currentUser?.name : user?.name}
            </p>
            {user?.uid === currentUser?.uid && (
              <p
                className="flex items-center gap-2  cursor-pointer"
                onClick={() => {
                  dispatch(clearToken());
                  dispatch(clearUser());
                  dispatch(clearPodcast());
                  dispatch(clearEpisode());
                  navigate("/");
                }}
              >
                <IoIosLogOut className="hover:dark:fill-white cursor-pointer dark:text-gray-200 opacity-50 hover:opacity-100 text-gray-800 cursor-pointer transition-all hover:scale-150 duration-500" />{" "}
                <span className="opacity-50 hover:opacity-100 dark:text-gray-200 text-gray-800">
                  Logout
                </span>
              </p>
            )}
          </div>
          {user?.uid === currentUser?.uid && (
            <div
              className="absolute top-3 right-3 group border rounded-full p-1 backdrop-blur-md bg-white/10 text-xl"
              onClick={handleEditProfile}
            >
              <MdModeEdit className="opacity-50 hover:opacity-100 cursor-pointer transition-all hover:scale-110 duration-500 text-black dark:text-white" />
              <p className="text-white bg-black px-1 text-xs absolute top-8 right-0 hidden group-hover:block rounded">
                Edit
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-10 items-center ">
          {user && (
            <h1 className="text-3xl">
              {user?.uid === currentUser?.uid ? "Your " : user?.name + "'s "}
              Podcasts
            </h1>
          )}
        </div>
        <div className="podcasts max-xxs:grid-cols-1 max-sm:items-center max-sm:px-2 max-sm:grid-cols-2  flex  grid grid-cols-3 max-xl:grid-cols-2  max-md:grid-cols-1 max-md:gap-2  gap-5 justify-center">
          {userPodcast?.map((podcast) => {
            // console.log(podcast);
            return (
              <UpdatedCard
                key={podcast.podcastId}
                podcastDetails={{
                  img: podcast.podcastImage,
                  podcastName: podcast.podcastTitle,
                }}
                onClick={() =>
                  navigate(`/podcast/${podcast.uid}/${podcast.podcastId}`)
                }
                podcast={podcast}
              />
            );
          })}
        </div>
        {userPodcast?.length === 0 && <p>User has no podcast</p>}

        {isPostOpen && (
          <div className="min-w-full min-h-screen h-full absolute top-0 left-0 flex items-center justify-center">
            <ProfileEdit />
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
