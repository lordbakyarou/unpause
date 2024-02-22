import { IoPlayCircleOutline, IoPauseCircleOutline } from "react-icons/io5";

import { useSelector, useDispatch } from "react-redux";
import { setEpisode } from "../redux/features/episods/episodsSlice";

import { playMusic } from "../redux/features/music/musicSlice";

import { pauseMusic } from "../redux/features/music/musicSlice";

function Episode({ episode, index }) {
  const dispatch = useDispatch();
  const currentEpisode = useSelector((state) => state.episode);

  const music = useSelector((state) => state.music);

  // console.log(currentEpisode.episode.episodeId, episode.episodeId);

  const playEpisode = () => {
    dispatch(setEpisode(episode));
    dispatch(playMusic());
  };

  return (
    <div className="flex flex-col pl-2 gap-3">
      <p className="text-2xl">
        {index + 1}. {episode.episodeName}
      </p>
      <p className="pl-5 opacity-50 hover:opacity-100 transition-all hover:scale-[102%] duration-500 cursor-pointer">
        {episode.episodeDescription}
      </p>
      <div className="rounded ml-5 w-fit flex gap-2 items-center cursor-pointer">
        <p onClick={playEpisode}>
          {music.status &&
          currentEpisode.episode.episodeId === episode.episodeId
            ? "Pause"
            : "Play"}
        </p>
        {music.status &&
        currentEpisode.episode.episodeId === episode.episodeId ? (
          <IoPauseCircleOutline
            onClick={() => dispatch(pauseMusic())}
            className="text-2xl transition-all hover:scale-[120%] duration-500 cursor-pointer"
          />
        ) : (
          <IoPlayCircleOutline
            onClick={playEpisode}
            className="text-2xl transition-all hover:scale-[120%] duration-500 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}

export default Episode;
