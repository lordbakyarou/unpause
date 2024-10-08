import { useEffect, useRef, useState } from "react";

import { FaPlay, FaPause } from "react-icons/fa";

import { TbRewindForward5 } from "react-icons/tb";
import { TbRewindBackward5 } from "react-icons/tb";

import { FaStepBackward } from "react-icons/fa";
import { FaStepForward } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import { RxCross1 } from "react-icons/rx";

import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import {
  clearEpisode,
  increaseIndex,
  decreaseIndex,
  resetIndex,
} from "../redux/features/episods/episodsSlice";

import { playMusic, pauseMusic } from "../redux/features/music/musicSlice";

function PodcastPlayer() {
  const episode = useSelector((state) => state.episode.episode);

  const navigate = useNavigate();
  const music = useSelector((state) => state.music);
  // console.log(music);
  // console.log(episode, "episode", music);

  const dispatch = useDispatch();

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(100);
  const [volumeVisible, setVolumeVisible] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  useEffect(() => {
    if (volume === 0) {
      setIsAudioMuted(true);
    } else {
      setIsAudioMuted(false);
    }
  }, [volume]);

  useEffect(() => {
    const handlePlayPause = () => {
      if (!music.status) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    };

    handlePlayPause();
  }, [music.status, episode.episodes[episode.index].episodeId]);

  useEffect(() => {});

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    if (audioRef.current.currentTime === audioRef.current.duration) {
      if (episode.episodes.length - 1 === episode.index) {
        dispatch(resetIndex());
      } else {
        dispatch(increaseIndex());
      }
    }
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleForward = () => {
    const newTime = currentTime + 5;
    if (newTime <= duration) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleBackward = () => {
    const newTime = currentTime - 5;
    if (newTime <= duration) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume / 100; // Set volume of the audio element
  };

  return (
    episode && (
      <div className="w-full fixed bottom-0 z-50">
        <div className="bg-red-light"></div>
        <div className="flex items-center justify-center h-fit bg-red-lightest">
          <div
            className="backdrop-blur-xl bg-black/40 shadow-outline w-full flex max-sm:flex-col items-center h-fit"
            //   style="width: 45rem !important;"
          >
            <div className="absolute right-1 top-1 w-fit h-fit text-white hover:cursor-pointer">
              <RxCross1 onClick={() => dispatch(clearEpisode())} />
            </div>
            <div className="flex gap-2 pt-1 pl-1 max-sm:w-full  items-center">
              {/* {console.log(episode)} */}
              <div className="w-32 h-20 mb-3">
                <img
                  className="w-full h-20  md:block max-sm:block object-cover "
                  src={episode.episodes[episode.index].episodeImage}
                  alt="Album Pic"
                  onClick={() =>
                    navigate(
                      `/podcast/${episode.episodes[episode.index].uid}/${
                        episode.episodes[episode.index].podcastId
                      }`
                    )
                  }
                />
              </div>
              <div className="w-full flex gap-2 max-sm:flex-col max-sm:w-full sm:items-center">
                <div className="flex  justify-between">
                  <div className="">
                    <marquee className="text-xl text-white whitespace-nowrap font-medium">
                      {episode.episodes[episode.index].episodeName}
                    </marquee>
                    <p className="text-sm text-white mt-1">
                      {episode.episodes[episode.index].episodeCreator}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between max-sm:justify-start max-sm:gap-10 max-xxs:justify-between max-xxs:px-1 max-xxs:gap-2 gap-2 text-xl items-center h-fit text-white">
                  <div
                    className="text-white hover:cursor-pointer"
                    onClick={() => dispatch(decreaseIndex())}
                  >
                    <FaStepBackward />
                  </div>
                  <div className="text-white hover:cursor-pointer">
                    <TbRewindBackward5 onClick={handleBackward} />
                  </div>
                  <div
                    onClick={() =>
                      music.status
                        ? dispatch(pauseMusic())
                        : dispatch(playMusic())
                    }
                    className="text-white cursor-pointer flex justify-center  items-center"
                  >
                    {music.status ? (
                      <div className="text-black rounded-full bg-white p-2 shadow-lg">
                        <FaPause />
                      </div>
                    ) : (
                      <div className="text-black rounded-full bg-white p-2 shadow-lg">
                        <FaPlay className="ml-0.5" />
                      </div>
                    )}
                  </div>

                  <div
                    className="text-white hover:cursor-pointer"
                    onClick={handleForward}
                  >
                    <TbRewindForward5 />
                  </div>
                  <div
                    className="text-white hover:cursor-pointer"
                    onClick={() => dispatch(increaseIndex())}
                  >
                    <FaStepForward />
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-8 py-2 max-sm:w-full w-full max-sm:px-10 max-xxs:px-5">
              <div className="flex justify-between text-sm text-white"></div>

              <div className="relative flex gap-1 sm:gap-3 items-center justify-between w-full">
                <p>{formatTime(currentTime)}</p>
                <audio
                  ref={audioRef}
                  src={episode.episodes[episode.index].episodeAudio}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                ></audio>

                <input
                  type="range"
                  className="w-full h-2 text-red-500  rounded-full shadow cursor-pointer"
                  id="audio-plyer"
                  value={currentTime}
                  max={duration || 0}
                  onChange={handleSeek}
                />
                <p>{formatTime(duration)}</p>
                <div className="flex gap-2 mx-8 relative items-center h-fit text-white">
                  {!isAudioMuted ? (
                    <FaVolumeUp
                      onClick={() => setVolumeVisible(!volumeVisible)}
                      className="cursor-pointer hover:text-gray-500"
                    />
                  ) : (
                    <FaVolumeMute
                      onClick={() => setVolumeVisible(!volumeVisible)}
                      className="cursor-pointer hover:text-gray-500"
                    />
                  )}
                  {volumeVisible && (
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      id="volume-player"
                      className="-rotate-90 absolute -right-14 bottom-20"
                      onChange={handleVolumeChange}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default PodcastPlayer;
