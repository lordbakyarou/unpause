import { CiPlay1 } from "react-icons/ci";

import { useNavigate } from "react-router-dom";

function LoadingCard({ podcastDetails, podcast }) {
  const navigate = useNavigate();

  return (
    <div
      className="w-80 h-[450px] animate-pulse max-sm:w-60 pt-4 max-sm:pt-1 max-xxs:w-full max-xxs:p-2 max-xxs:h-fit max-sm:h-fit rounded-2xl flex flex-col gap-2 justify-between max-sm:justify-evenly "
      style={{
        backgroundImage:
          "linear-gradient(rgba(58, 129, 191, 0.3), rgba(65, 48, 90, 0.3))",
      }}
    >
      <div className="image w-full h-fit flex flex-col items-center justify-start pt-1 ">
        <svg
          class="w-full h-full text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div className="flex flex-col gap-2 flex-grow">
        <div className="flex justify-between px-4 items-center text-primary-text-color ">
          <p className="w-fit max-sm:text-lg overflow-hidden opacity-50 hover:opacity-100 cursor-pointer"></p>
          <CiPlay1 className="hover:fill-white cursor-pointer cursor-pointer transition-all hover:scale-150 duration-500" />
        </div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
        <div className="flex justify-between px-4 items-center text-primary-text-color">
          <p className="w-fit max-sm:text-lg overflow-hidden opacity-50 hover:opacity-100 cursor-pointer"></p>
        </div>
        <div className="flex px-4 items-center  whitespace-nowrap flex-wrap scrollbar-hide text-primary-text-color"></div>
      </div>
    </div>
  );
}

export default LoadingCard;
