import { CiImageOn } from "react-icons/ci";
import { BsArrowClockwise } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { db, storage, auth } from "../Firebase/firebase";

import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

import {
  createUserWithEmailAndPassword,
  signInWithCredential,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";

import { CiCircleList } from "react-icons/ci";

import { MdOutlineCancel } from "react-icons/md";

import { GoogleAuthProvider } from "firebase/auth";

import { v4 as uuidv4 } from "uuid";

import {
  addPodcast,
  removePodcast,
} from "../redux/features/podcast/podcastSlice";

import { toast } from "react-toastify";

const defaultBanner =
  "https://firebasestorage.googleapis.com/v0/b/podcast-application-react.appspot.com/o/default_podcast__banner%2Fback-to-school-6305090_1920.jpg?alt=media&token=7a5405eb-c4af-460f-b3ce-15f9f5a031da";

const defaultPodcastImage =
  "https://firebasestorage.googleapis.com/v0/b/podcast-application-react.appspot.com/o/default_podcast_image%2F4764773.jpg?alt=media&token=4032e727-52a2-4bc5-9a86-abf11abe663d";

function CreatePodcast() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const uuid = uuidv4();

  const token = useSelector((state) => state.token.token);
  const user = useSelector((state) => state.user.user);
  const userPodcast = useSelector((state) => state.podcast.podcast);

  const [loading, setLoading] = useState(false);

  const [searchCategory, setSearchCategory] = useState("");

  const [image, setImage] = useState(null);
  const [podcastImage, setPodcastImage] = useState(null);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const [podcast, setPodcast] = useState({
    podcastTitle: "",
    podcastDescription: "",
  });

  const { podcastTitle, podcastDescription } = podcast;
  // console.log(podcastDescription);

  function setPodcastDetails(e) {
    setPodcast({ ...podcast, [e.target.name]: e.target.value });
  }

  dispatch(removePodcast(0));

  // console.log(image, "image", podcastImage, "podcastImage");

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

  const [filteredCategories, setFilteredCategories] = useState([]);

  const handleCreatePodcast = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log("handleCreatePodcast");
    if (token) {
      try {
        const podcastId = uuidv4();
        // console.log(podcastId);

        let bannerImageUrl = defaultBanner;
        let podcastImageUrl = defaultPodcastImage;

        if (image) {
          const storageRef = ref(
            storage,
            `podcasts/${user.uid}/${podcastId}/banner/${user.uid}`
          );
          await uploadBytes(storageRef, image);
          bannerImageUrl = await getDownloadURL(storageRef);
        }

        if (podcastImage) {
          const storageRef = ref(
            storage,
            `podcasts/${user.uid}/${podcastId}/podcast/${user.uid}`
          );
          await uploadBytes(storageRef, podcastImage);
          podcastImageUrl = await getDownloadURL(storageRef);
        }

        await setDoc(doc(db, `podcasts/${user.uid}/podcast`, podcastId), {
          podcastTitle,
          podcastDescription,
          genres: selectedCategories,
          uid: user.uid,
          bannerImage: bannerImageUrl,
          podcastImage: podcastImageUrl,
          podcastId,
          episodes: [],
        });

        dispatch(
          addPodcast({
            podcastTitle,
            podcastDescription,
            genres: selectedCategories,
            uid: user.uid,
            bannerImage: bannerImageUrl,
            podcastImage: podcastImageUrl,
            podcastId,
            episodes: [],
          })
        );
        setLoading(false);
        navigate(`/profile/${user.uid}`);

        toast.success("Podcast Created");
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error("Error while creating podcast");
      }
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      toast.error("You must first login");
      return;
    }

    const handleSearch = () => {
      setFilteredCategories(
        podcastCategories.filter(
          (item) =>
            item
              .toLocaleLowerCase()
              .includes(searchCategory.toLocaleLowerCase()) &&
            !selectedCategories.includes(item)
        )
      );
    };

    handleSearch();
  }, [searchCategory, selectedCategories]);

  return (
    <div className="pt-20 pb-40 flex justify-center items-center flex-col scrollbar-hide gap-10 ">
      <h1 className="text-4xl font-semibold max-sm:text-xl">
        Create A Podcast
      </h1>
      <form
        className="flex flex-col items-center justify-center gap-5"
        autoComplete="off"
      >
        <div className="input-password  relative">
          <input
            type="text"
            placeholder="Podcast TItle"
            name="podcastTitle"
            className="peer outline-none bg-transparent p-3 rounded border w-[500px] max-sm:w-[300px] placeholder-transparent"
            onChange={(e) => setPodcastDetails(e)}
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
            Podcast Title
          </label>
          {/* 
                  {loginInUser.password && (
                    <div
                      className="absolute top-2.5 right-2 text-lg text-gray-800 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  )} */}
        </div>
        <div className="input-password  relative">
          <input
            type="text"
            placeholder="Podcast Description"
            name="podcastDescription"
            className="peer outline-none bg-transparent p-3 rounded border w-[500px] max-sm:w-[300px] placeholder-transparent"
            onChange={(e) => setPodcastDetails(e)}
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
            What is this podcast about?
          </label>
          {/* 
                  {loginInUser.password && (
                    <div
                      className="absolute top-2.5 right-2 text-lg text-gray-800 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  )} */}
        </div>

        <div className="input-password  relative">
          <input
            type="text"
            placeholder="Add Genres"
            name="genres"
            className="peer outline-none bg-transparent p-3 rounded border w-[500px] max-sm:w-[300px] placeholder-transparent"
            onChange={(e) => setSearchCategory(e.target.value)}
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
            Add Genres
          </label>
          <label
            className="absolute
                  right-3.5 top-3
                   text-gray-400
                   text-2xl
                  "
          >
            <CiCircleList />
          </label>
          {selectedCategories.length > 0 && (
            <div className="w-[500px] max-sm:w-[300px] h-fit max-h-[200px]  rounded p-2 mt-2  overflow-scroll backdrop-blur-sm border rounded flex flex-wrap gap-2">
              {selectedCategories.map((item, index) => (
                <p className="backdrop-blur-sm bg-white/30 w-fit rounded-xl p-2 text-sm flex items-center gap-2">
                  <MdOutlineCancel
                    onClick={() => {
                      const temp = [...selectedCategories];
                      temp.splice(index, 1);
                      // console.log(temp, selectedCategories);
                      setSelectedCategories(temp);
                    }}
                  />{" "}
                  {item}
                </p>
              ))}
            </div>
          )}

          {searchCategory && (
            <div className="w-[500px] max-sm:w-[300px] h-fit max-h-[200px]  rounded p-2 mt-2  overflow-scroll backdrop-blur-sm bg-white/30">
              {filteredCategories.length > 0
                ? filteredCategories.map((item) => {
                    return (
                      <div
                        onClick={() =>
                          setSelectedCategories([...selectedCategories, item])
                        }
                      >
                        {item}
                      </div>
                    );
                  })
                : "No such genre found"}
            </div>
          )}
        </div>

        <label
          htmlFor="bannerImage"
          className="block cursor-pointer outline-none bg-transparent p-3 rounded border w-[500px] max-sm:w-[300px]"
        >
          <span className="text-gray-400 flex gap-2 items-center">
            Banner Image <CiImageOn className="text-2xl" />
          </span>
          <input
            id="bannerImage"
            type="file"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        <label
          htmlFor="podcastImage"
          className="block cursor-pointer outline-none bg-transparent p-3 rounded border w-[500px] max-sm:w-[300px]"
        >
          <span className="text-gray-400 flex gap-2 items-center">
            Podcast Image <CiImageOn className="text-2xl" />
          </span>
          <input
            id="podcastImage"
            type="file"
            className="hidden"
            onChange={(e) => {
              setPodcastImage(e.target.files[0]);
            }}
          />
        </label>

        <button
          className="border-2  rounded p-3 font-semibold w-[500px] max-sm:w-[300px] hover:bg-gray-200 hover:bg-opacity-20"
          onClick={handleCreatePodcast}
        >
          {loading ? (
            <div className="flex gap-2 justify-center items-center">
              <BsArrowClockwise className="animate-spin" />
              Creating Your Podcast...
            </div>
          ) : (
            "Create Podcast"
          )}
        </button>
      </form>
    </div>
  );
}

export default CreatePodcast;
