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
import UserCard from "../Components/UserCard";

function Users() {
  const [allUser, setAllUser] = useState([]);
  //   const podcast = useSelector((state) => state.podcast.podcast);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token.token);

  const [filteredUser, setFilteredUser] = useState([...allUser]);

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
          console.log(userDoc.data());
          newArray.push(userDoc.data());
        });
        setAllUser([...newArray]);
      } catch (error) {
        console.error("Error fetching podcasts: ", error);
      }
    };

    fetchPodcast();
  }, []);

  useEffect(() => {
    const temp = allUser.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
        user.email.toLowerCase().includes(search.toLocaleLowerCase())
    );

    setFilteredUser(temp);
  }, [search, allUser]);

  const [filterOption, setFilterOption] = useState(false);

  return (
    <div class="p-4 sm:ml-64">
      <div className="pt-20 pb-40 w-full podcast overflow-auto flex justify-center items-center flex-col gap-10 bg-transparent">
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="flex flex-col gap-10 items-center">
            <h1 className="text-3xl">All Users</h1>
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
                className="absolute top-5 right-2"
                onClick={() => setFilterOption(!filterOption)}
              ></p>
            </div>
          </div>
        </div>

        {allUser.length == 0 && (
          <div className="podcasts max-xxs:grid-cols-1 max-sm:items-center max-sm:px-2 max-sm:grid-cols-2  flex  grid grid-cols-3 max-xl:grid-cols-2  max-md:grid-cols-1 max-md:gap-2  gap-5 justify-center">
            {[1, 2, 3, 4, 5, 6].map((item, index) => {
              return <LoadingCard key={index} />;
            })}
          </div>
        )}

        {allUser.length > 0 && (
          <div className="podcasts max-xxs:grid-cols-1 max-sm:items-center max-sm:px-2 max-sm:grid-cols-2  flex  grid grid-cols-3 max-xl:grid-cols-2  max-md:grid-cols-1 max-md:gap-2  gap-5 justify-center">
            {filteredUser?.map((user, index) => (
              <UserCard user={user} key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
