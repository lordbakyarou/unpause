import { useNavigate } from "react-router-dom";

function UserCard({ user }) {
  const navigate = useNavigate();

  return (
    <div className="group px-8 w-72 hover:scale-105 transition duration-200 cursor-default max-xxs:w-full max-sm:w-56 max-lg:w-60 max-md:w-80 shadow dark:bg-gray-800 bg-white max-w-sm mx-auto shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
      <img
        className="transition-all object-cover mx-auto h-16 w-16 max-sm:h-40 max-sm:w-40 rounded-full sm:mx-0 sm:shrink-0"
        src={user.profilePic}
        alt=""
      />
      <div className="text-center truncate space-y-1 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg dark:text-white text-gray-900 font-semibold">
            {user.name}
          </p>
          <p className="dark:text-gray-400 text-gray-700 truncate font-medium">
            {user.email}
          </p>
        </div>
        <button
          className="px-2 py-1 text-sm bg-green-400 text-gray-900 font-semibold rounded-sm hover:text-gray-900 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={() => navigate(`/profile/${user.uid}`)}
        >
          Visit User
        </button>
      </div>
    </div>
  );
}

export default UserCard;
