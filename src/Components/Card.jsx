import { CiPlay1 } from "react-icons/ci";

import { useNavigate } from "react-router-dom";

function Card({ podcastDetails, podcast }) {
  const navigate = useNavigate();

  return (
    <div
      className="w-80 h-[510px] max-sm:w-60 pt-4 max-sm:pt-1 max-xxs:w-full max-xxs:p-2 max-xxs:h-fit  max-sm:h-full  rounded-2xl flex flex-col gap-2 justify-between max-sm:justify-evenly "
      style={{
        backgroundImage:
          "linear-gradient(rgba(58, 129, 191, 0.3), rgba(65, 48, 90, 0.3))",
      }}
    >
      <div
        className="image w-full h-fit flex flex-col items-center justify-start pt-1 "
        onClick={() => navigate(`/podcast/${podcast.uid}/${podcast.podcastId}`)}
      >
        <img
          src={podcastDetails.img}
          className="w-[280px]  h-72 max-xxs:w-full max-xxs:p-2 max-xxs:h-96 object-cover rounded-t-2xl cursor-pointer transition-all hover:scale-105 duration-500 max-sm:w-64 max-sm:h-40"
        />
      </div>
      <div className="flex flex-col gap-2 flex-grow">
        <div className="flex justify-between px-4 items-center text-primary-text-color ">
          <p className="w-fit max-sm:text-lg overflow-hidden  hover:opacity-100 cursor-pointer">
            {podcastDetails.podcastName}
          </p>
          <CiPlay1
            className="hover:fill-white cursor-pointer cursor-pointer transition-all hover:scale-150 duration-500"
            onClick={() =>
              navigate(`/podcast/${podcast.uid}/${podcast.podcastId}`)
            }
          />
        </div>
        <div className="flex justify-between px-4 items-center text-primary-text-color">
          <p className="w-fit max-sm:text-sm text-sm max-h-20 overflow-scroll scrollbar-hide opacity-50 hover:opacity-100 cursor-pointer">
            {podcast?.podcastDescription}
          </p>
        </div>
        <div className="flex px-4 items-center  whitespace-nowrap flex-wrap scrollbar-hide text-primary-text-color">
          {podcast?.genres?.length >= 0 &&
            podcast.genres.map((genre, index) => {
              if (index > 2) {
                return;
              } else
                return (
                  <span class="inline-block w-fit bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #{genre}
                  </span>
                );
            })}
        </div>
      </div>
    </div>
  );
}

export default Card;
