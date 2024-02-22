import { CiPlay1 } from "react-icons/ci";

import Card from "../Components/Card";
import { useEffect, useState } from "react";

import { db, storage, auth } from "../Firebase/firebase";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addAllPodcast } from "../redux/features/allPodcast/allPodcastSlice";
import { toast } from "react-toastify";

function Podcasts() {
  const allPodcast = [useSelector((state) => state.allPodcast.allPodcast)];
  const podcast = useSelector((state) => state.podcast.podcast);
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
        const usersCollectionRef = collection(db, "users");
        const usersQuerySnapshot = await getDocs(usersCollectionRef);

        const newArray = [];

        usersQuerySnapshot.forEach(async (userDoc) => {
          const userId = userDoc.id;
          const userPodcastsCollectionRef = collection(
            db,
            `podcasts/${userId}/podcast`
          );
          const userPodcastsQuerySnapshot = await getDocs(
            userPodcastsCollectionRef
          );

          userPodcastsQuerySnapshot.forEach((podcastDoc) => {
            newArray.push(podcastDoc.data());
          });
          // console.log(newArray);
          dispatch(addAllPodcast([...newArray]));
        });
      } catch (error) {
        console.error("Error fetching podcasts: ", error);
      }
    };

    fetchPodcast();
  }, [podcast]);

  useEffect(() => {
    const temp = allPodcast[0].filter(
      (podcast) =>
        podcast.podcastTitle
          .toLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        podcast.genres.includes(search)
    );

    setFilteredPodcast(temp);
  }, [search]);

  const podcastCategories = [
    "Comedy",
    "Interview",
    "Hybrid podcasts",
    "True crime",
    "Solo podcasts",
    "History",
    "News",
    "Pop culture",
    "Repurposed content",
    "Storytelling podcast",
    "Arts",
    "Health and fitness",
    "Music",
    "Religious",
    "Science",
    "The panel podcast",
    "Beauty and fashion",
    "Business",
    "Sports",
    "Educational",
    "Books",
    "News podcast",
    "Technology",
  ];

  return (
    <div className="pt-5 pb-40 w-full  overflow-y-hidden flex justify-center items-center flex-col gap-10 bg-primary-background">
      <div className="flex flex-col gap-2 items-center justify-center">
        <div className="flex flex-col gap-10 items-center">
          <h1 className="text-3xl">Discover Podcasts</h1>
          <div className="flex max-lg:w-[700px]  max-md:w-[600px] max-sm:w-[490px] max-xxs:w-[300px] relative ">
            <input
              // type={showPassword ? "text" : "password"}
              placeholder="Search"
              name="text"
              className="peer outline-none bg-transparent p-3 rounded border w-[1000px] max-lg:w-[800px] placeholder-transparent"
              onChange={(e) => setSearch(e.target.value)}
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
              Search
            </label>
          </div>
        </div>

        <div className="flex gap-2 w-[1000px] max-lg:w-[700px] max-md:w-[600px] max-sm:w-[490px] max-xxs:w-[300px] flex-wrap ">
          {podcastCategories.map((category, index) => (
            <p
              key={index}
              onClick={() => setSearch(category)}
              className="backdrop-blur-sm max-sm:text-xs w-fit cursor-pointer hover:bg-white/40 bg-white/30 rounded-xl p-2 text-sm"
            >
              {category}
            </p>
          ))}
        </div>
      </div>

      <div className="podcasts max-sm:w-full  flex  grid grid-cols-3 max-lg:grid-cols-2  max-md:grid-cols-1  gap-5 justify-center">
        {filteredPodcast?.map((podcast) => (
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
        ))}
      </div>
    </div>
  );
}

export default Podcasts;
