import { CiPlay1 } from "react-icons/ci";

import Card from "../Components/Card";
import { useEffect, useState } from "react";

import { db, storage, auth } from "../Firebase/firebase";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";

import { useNavigate } from "react-router-dom";

import { FaFilter } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { addAllPodcast } from "../redux/features/allPodcast/allPodcastSlice";
import { toast } from "react-toastify";
import LoadingCard from "../Components/LoadingCard";

function Podcasts() {
  const [allPodcast, setAllPodcast] = useState([]);
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
          setAllPodcast([...newArray]);
        });
      } catch (error) {
        console.error("Error fetching podcasts: ", error);
      }
    };

    fetchPodcast();
  }, [podcast]);

  useEffect(() => {
    const temp = allPodcast.filter(
      (podcast) =>
        podcast.podcastTitle
          .toLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        podcast.genres.includes(search)
    );

    setFilteredPodcast(temp);
  }, [search, allPodcast]);

  const [filterOption, setFilterOption] = useState(false);

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
    <div class="p-4 sm:ml-64">
      <div className="pt-20 pb-40 w-full podcast overflow-auto flex justify-center items-center flex-col gap-10 bg-transparent">
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="flex flex-col gap-10 items-center">
            <h1 className="text-3xl">Discover Podcasts</h1>
            <div className="flex max-lg:w-[450px] relative max-md:w-[300px] max-sm:w-[400px] max-xxs:w-[300px] w-full relative items-center gap-2">
              <input
                // type={showPassword ? "text" : "password"}
                placeholder="Search"
                name="text"
                className="peer outline-none bg-transparent p-3 rounded border w-[900px] max-lg:w-[450px] max-xl:w-[700px] placeholder-transparent"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
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
              <p
                className="absolute top-4 right-2"
                onClick={() => setFilterOption(!filterOption)}
              >
                <FaFilter />
              </p>
            </div>
          </div>

          <div className="transition-all duration-1000 ease-in-out">
            {filterOption && (
              <div className="flex gap-2 w-[1000px] max-lg:w-[700px] max-md:w-[600px] max-sm:w-[490px] max-xxs:w-[300px] flex-wrap ">
                {podcastCategories.map((category, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSearch(category);
                      setSearch(category);
                    }}
                    className="backdrop-blur-sm max-sm:text-xs w-fit cursor-pointer hover:bg-white/40 bg-white/30 rounded-xl p-2 text-sm"
                  >
                    {category}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {allPodcast.length == 0 && (
          <div className="podcasts max-xxs:grid-cols-1  max-sm:items-center max-sm:px-2 max-sm:grid-cols-2  flex  grid grid-cols-3 max-lg:grid-cols-2  max-md:grid-cols-1 max-md:gap-2  gap-5 justify-center">
            {[1, 2, 3, 4, 5, 6].map((item, index) => {
              return <LoadingCard key={index} />;
            })}
          </div>
        )}

        {allPodcast.length > 0 && (
          <div className="podcasts max-xxs:grid-cols-1 max-sm:items-center max-sm:px-2 max-sm:grid-cols-2  flex  grid grid-cols-3 max-xl:grid-cols-2  max-md:grid-cols-1 max-md:gap-2  gap-5 justify-center">
            {filteredPodcast?.map((podcast, index) => (
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

export default Podcasts;
