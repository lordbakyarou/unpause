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

import { toast } from "react-toastify";

function Profile() {
  const [user, setUser] = useState(null);
  const currentUser = useSelector((state) => state.user.user);
  // const userPodcast = useSelector((state) => state.podcast.podcast);

  const [userPodcast, seUserPodcast] = useState(null);
  const navigate = useNavigate();

  const { uid } = useParams();
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
    }
  }, []);

  useEffect(() => {
    async function getUsersDetail() {
      const userDetail = await getDoc(doc(db, "users", uid));
      setUser(userDetail.data(), "asfasdfsd");
    }

    getUsersDetail();
  }, [uid]);

  useEffect(() => {
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
    <div className="pt-5 w-full pb-40 overflow-y-hidden flex justify-center items-center flex-col gap-10 bg-primary-background">
      <div className="flex flex-col gap-10 items-center ">
        <h1 className="text-3xl">Profile</h1>
      </div>
      <div
        className="w-80 h-[350px] rounded-2xl relative flex flex-col gap-2 justify-between "
        style={{
          backgroundImage:
            "linear-gradient(rgba(58, 129, 191, 0.3), rgba(65, 48, 90, 0.3))",
        }}
      >
        <div className="image w-full h-full flex flex-col items-center justify-start pt-4 ">
          <img
            src={user?.profilePic}
            className="w-[280px] h-72 object-cover rounded-t-2xl cursor-pointer transition-all hover:scale-105 duration-500"
          />
        </div>
        <div className="flex justify-between px-7 pb-10 items-center text-primary-text-color">
          <p className="w-fit  overflow-hidden opacity-50 hover:opacity-100 cursor-pointer">
            {user?.name}
          </p>
          {user?.uid === currentUser.uid && (
            <p
              className="flex items-center gap-2  cursor-pointer"
              onClick={() => {
                dispatch(clearToken());
                dispatch(clearUser());
                dispatch(clearPodcast());
                navigate("/");
              }}
            >
              <IoIosLogOut className="hover:fill-white cursor-pointer opacity-50 hover:opacity-100 cursor-pointer transition-all hover:scale-150 duration-500" />{" "}
              <span className="opacity-50 hover:opacity-100">Logout</span>
            </p>
          )}
        </div>
        {user?.uid === currentUser.uid && (
          <div
            className="absolute top-3 right-3 group border rounded-full p-1 backdrop-blur-md bg-white/10 text-xl"
            onClick={handleEditProfile}
          >
            <MdModeEdit className=" opacity-50 hover:opacity-100 cursor-pointer transition-all hover:scale-110 duration-500 text-black" />
            <p className="text-white bg-black px-1 text-xs absolute top-8 right-0 hidden group-hover:block rounded">
              Edit
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-10 items-center ">
        {user && (
          <h1 className="text-3xl">
            {user?.uid === currentUser.uid ? "Your " : user?.name + "'s "}
            Podcasts
          </h1>
        )}
      </div>
      <div className="max-sm:w-full  flex  grid grid-cols-3 max-lg:grid-cols-2  max-md:grid-cols-1  gap-5 justify-center">
        {userPodcast?.map((podcast) => {
          // console.log(podcast);
          return (
            <div
              onClick={() =>
                navigate(`/podcast/${podcast.uid}/${podcast.podcastId}`)
              }
            >
              <Card
                podcastDetails={{
                  img: podcast.podcastImage,
                  podcastName: podcast.podcastTitle,
                }}
              />
            </div>
          );
        })}
      </div>
      {!userPodcast && <p>User has no podcast</p>}

      {isPostOpen && (
        <div className="w-screen h-screen absolute top-0 flex items-center justify-center">
          <ProfileEdit />
        </div>
      )}
    </div>
  );
}

export default Profile;
