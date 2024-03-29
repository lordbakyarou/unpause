import { useNavigate } from "react-router-dom";

function UserCard({ user }) {
  const navigate = useNavigate();

  return (
    <div
      class="py-8 px-8 w-80  max-xxs:w-full max-sm:w-56 max-lg:w-60 max-md:w-80  max-w-sm mx-auto  rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
      style={{
        backgroundImage:
          "linear-gradient(rgba(58, 129, 191, 0.3), rgba(65, 48, 90, 0.3))",
      }}
    >
      <img
        class="transition-all object-cover hover:scale-110 duration-200 mx-auto h-20 w-20 max-sm:h-40 max-sm:w-40  rounded-full sm:mx-0 sm:shrink-0"
        src={user.profilePic}
        alt=""
      />
      <div class="text-center truncate space-y-2 sm:text-left">
        <div class="space-y-0.5">
          <p class="text-lg text-white font-semibold">{user.name}</p>
          <p class="text-slate-500 truncate  font-medium">{user.email}</p>
        </div>
        <button
          class="px-2 py-1 text-sm  bg-gray-900  font-semibold rounded-md  hover:text-white hover:bg-white/30 hover:backdrop-blur-xl hover:border-transparent focus:outline-none "
          onClick={() => navigate(`/profile/${user.uid}`)}
        >
          Visit User
        </button>
      </div>
    </div>
  );
}

export default UserCard;
