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

const PodcastDetailLoading = () => {
  const { uid, id } = useParams();
  const navigate = useNavigate();

  return (
    <div
      className={`py-5 px-20 max-lg:px-4 pb-56 max-sm:px-4 animate-pulse pb-40 w-full overflow-y-hidden flex justify-center flex-col gap-10 backdrop-blur-sm `}
    >
      <>
        <div className="flex flex-col gap-10 "></div>

        <div className="image w-full h-full flex flex-col items-center justify-start pt-4 ">
          <div className="w-full h-[350px] object-cover rounded-2xl cursor-pointer transition-all hover:scale-105 duration-500">
            <svg
              className="w-full h-full text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
        </div>
        <div className=" w-full flex  items-center  gap-2 justify-end">
          <div className="w-fit flex items-center h-full ">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          </div>
          <p
            className="w-7 h-7 rounded-full bg-transparent overflow-hidden border  cursor-pointer transition-all hover:scale-[110%] duration-500"
            //   onClick={() => navigate(`/profile/${podcast.uid}`)}
          >
            <svg
              className="w-full h-full text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </p>
        </div>

        <div className="flex w-full flex-row items-center gap-2">
          <div className="mr-2">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>{" "}
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
          </div>
          <div className="flex overflow-scroll whitespace-nowrap scrollbar-hide gap-2"></div>
        </div>

        <div className="flex flex-col gap-10 opacity-50 hover:opacity-100 transition-all hover:scale-[103%] duration-500 cursor-pointer"></div>

        <div className={`w-full flex flex-col gap-5 `}>
          <div className="flex flex-col gap-4">
            <div className="flex  justify-between items-center">
              <p className="text-3xl">Episodes</p>
            </div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
          </div>
          {/* need to chang ethis */}
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        </div>
      </>
    </div>
  );
};

export default PodcastDetailLoading;
