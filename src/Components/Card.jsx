import { CiPlay1 } from "react-icons/ci";

function Card({ podcastDetails }) {
  return (
    <div
      className="w-80 h-[350px] max-sm:w-full max-sm:h-fit rounded-2xl flex flex-col gap-2 justify-between "
      style={{
        backgroundImage:
          "linear-gradient(rgba(58, 129, 191, 0.3), rgba(65, 48, 90, 0.3))",
      }}
    >
      <div className="image w-full h-full flex flex-col items-center justify-start pt-4 ">
        <img
          src={podcastDetails.img}
          className="w-[280px] h-72 max-sm:w-full max-sm:p-2 max-sm:h-96 object-cover rounded-t-2xl cursor-pointer transition-all hover:scale-105 duration-500"
        />
      </div>
      <div className="flex justify-between px-7 pb-10 items-center text-primary-text-color">
        <p className="w-40 max-sm:text-2xl overflow-hidden opacity-50 hover:opacity-100 cursor-pointer">
          {podcastDetails.podcastName}
        </p>
        <CiPlay1 className="hover:fill-white cursor-pointer cursor-pointer transition-all hover:scale-150 duration-500" />
      </div>
    </div>
  );
}

export default Card;
