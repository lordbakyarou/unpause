import { CiPlay1 } from "react-icons/ci";

import Card from "../Components/Card";
import { useEffect, useState } from "react";

import { db, storage, auth } from "../Firebase/firebase";
import {
  getDoc,
  doc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";

import { useNavigate } from "react-router-dom";

import { FaFilter } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { addAllPodcast } from "../redux/features/allPodcast/allPodcastSlice";
import { toast } from "react-toastify";
import LoadingCard from "../Components/LoadingCard";

function LikedPodcasts() {
  const [allPodcast, setAllPodcast] = useState([]);
  const [favPodcast, setFavPodcast] = useState([]);

  const podcast = useSelector((state) => state.podcast.podcast);

  const currentUser = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const token = useSelector((state) => state.token.token);

  const [filteredPodcast, setFilteredPodcast] = useState([...allPodcast]);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
      toast.error("You must first login");
    }

    const fetchPodcast = async () => {
      try {
        const getCurrentUserLikes = await getDoc(
          doc(db, "users", currentUser.uid)
        );
        const userRef = doc(db, "users", currentUser.uid);

        const likes = getCurrentUserLikes.data().likes;

        const likeArray = [];

        await likes.forEach(async (like) => {
          const getLike = await getDoc(
            doc(db, "podcasts", like.uid, "podcast", like.id)
          );

          if (getLike.data() != undefined) {
            likeArray.push(getLike.data());
          } else {
            // console.log(like.id);
            const updatedLikes = getCurrentUserLikes
              .data()
              .likes.filter((item) => item.id !== like.id);
            await updateDoc(userRef, { likes: updatedLikes });
          }
        });

        // console.log([likeArray], "likearray");

        const usersCollectionRef = collection(db, "users");
        const usersQuerySnapshot = await getDocs(usersCollectionRef);

        // console.log(newArray);
        setAllPodcast([...likeArray]);
      } catch (error) {
        console.error("Error fetching podcasts: ", error);
      }
    };

    fetchPodcast();
  }, [podcast]);

  // console.log(allPodcast, "allpodcast");

  return (
    <div class="p-4 sm:ml-64">
      <div className="pt-20 pb-40 w-full podcast overflow-auto flex justify-center items-center flex-col gap-10 bg-transparent">
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="flex flex-col gap-10 items-center">
            <h1 className="text-3xl">Your Favorite Podcasts</h1>
          </div>

          <div className="transition-all duration-1000 ease-in-out"></div>
        </div>

        {allPodcast.length == 0 && (
          <div className="podcasts max-xxs:grid-cols-1  max-sm:items-center max-sm:px-2 max-sm:grid-cols-2  flex  grid grid-cols-3 max-lg:grid-cols-2  max-md:grid-cols-1 max-md:gap-2  gap-5 justify-center">
            {[1, 2, 3, 4, 5, 6].map((a, index) => {
              return <LoadingCard key={index} />;
            })}
          </div>
        )}

        {allPodcast.length > 0 && (
          <div className="podcasts max-xxs:grid-cols-1 max-sm:items-center max-sm:px-2 max-sm:grid-cols-2  flex  grid grid-cols-3 max-xl:grid-cols-2  max-md:grid-cols-1 max-md:gap-2  gap-5 justify-center">
            {allPodcast?.map((podcast, index) => (
              <Card
                key={index}
                onClick={() =>
                  navigate(`/podcast/${podcast.uid}/${podcast.podcastId}`)
                }
                podcastDetails={{
                  img: podcast.podcastImage,
                  podcastName: podcast.podcastTitle,
                }}
                podcast={podcast}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LikedPodcasts;
