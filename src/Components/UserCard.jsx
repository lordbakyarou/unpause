import { useNavigate } from "react-router-dom";

function UserCard({ user }) {
  const navigate = useNavigate();

  return (
    <div
      className="px-8 w-72 hover:scale-105 trasition duration-200 cursor-default max-xxs:w-full max-sm:w-56 max-lg:w-60 max-md:w-80 shadow bg-gray-800 max-w-sm mx-auto shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
      // style={{
      //   backgroundImage:
      //     "linear-gradient(rgba(58, 129, 191, 0.3), rgba(65, 48, 90, 0.3))",
      // }}
    >
      <img
        className="transition-all object-cover mx-auto h-16 w-16 max-sm:h-40 max-sm:w-40  rounded-full sm:mx-0 sm:shrink-0"
        src={user.profilePic}
        alt=""
      />
      <div className="text-center truncate space-y-1 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-white font-semibold">{user.name}</p>
          <p className="text-slate-500 truncate  font-medium">{user.email}</p>
        </div>
        <button
          className="px-2 py-1 text-sm  bg-gray-700  font-semibold rounded-sm  hover:text-white hover:bg-white/30 hover:backdrop-blur-xl hover:border-transparent focus:outline-none "
          onClick={() => navigate(`/profile/${user.uid}`)}
        >
          Visit User
        </button>
      </div>
    </div>
  );
}

export default UserCard;
