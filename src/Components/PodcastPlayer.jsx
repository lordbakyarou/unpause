import { useEffect, useRef, useState } from "react";

import { FaPlay, FaPause } from "react-icons/fa";

import { TbRewindForward5 } from "react-icons/tb";
import { TbRewindBackward5 } from "react-icons/tb";

import { FaStepBackward } from "react-icons/fa";
import { FaStepForward } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

import { playMusic, pauseMusic } from "../redux/features/music/musicSlice";

function PodcastPlayer() {
  const episode = useSelector((state) => state.episode.episode);
  // console.log(episode, "episode");

  const music = useSelector((state) => state.music);
  // console.log(music);

  const dispatch = useDispatch();

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(100);
  const [volumeVisible, setVolumeVisible] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // console.log(music.status);
  // console.log(audioRef.current);

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
  }, [music.status, episode.episodeId]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
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
      <div class="w-full fixed bottom-0 z-50">
        <div class="bg-red-light"></div>
        <div class="flex items-center justify-center h-fit bg-red-lightest">
          <div
            class="bg-white w-full flex max-sm:flex-col items-center h-fit"
            //   style="width: 45rem !important;"
          >
            <div class="flex gap-2 p-2 max-sm:w-full  items-center">
              {/* {console.log(episode)} */}
              <div>
                <img
                  className="w-full hidden md:block max-sm:block w-32 h-20"
                  src={episode.episodeImage}
                  alt="Album Pic"
                />
              </div>
              <div class="w-full flex gap-4 max-sm:flex-col max-sm:w-full sm:items-center">
                <div class="flex  justify-between">
                  <div className="">
                    <h3 class="text-xl text-gray-900 font-medium">
                      {episode.episodeName}
                    </h3>
                    <p class="text-sm text-gray-600 mt-1">
                      {episode.episodeCreator}
                    </p>
                  </div>
                </div>
                <div class="flex justify-between max-sm:justify-start max-sm:gap-10 max-xxs:justify-between max-xxs:gap-2 gap-2 text-xl items-center h-fit text-black">
                  <div class="text-gray-800">
                    <FaStepBackward />
                  </div>
                  <div class="text-gray-800">
                    <TbRewindBackward5 onClick={handleBackward} />
                  </div>
                  <div
                    onClick={() =>
                      music.status
                        ? dispatch(pauseMusic())
                        : dispatch(playMusic())
                    }
                    className="text-black cursor-pointer"
                  >
                    {music.status ? (
                      <div class="text-black rounded-full bg-red-light shadow-lg">
                        <FaPause />
                      </div>
                    ) : (
                      <div class="text-black rounded-full bg-red-light shadow-lg">
                        <FaPlay />
                      </div>
                    )}
                  </div>

                  <div class="text-gray-800" onClick={handleForward}>
                    <TbRewindForward5 />
                  </div>
                  <div class="text-gray-800">
                    <FaStepForward />
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-8 py-4 max-sm:w-full max-sm:px-10 max-xxs:px-5">
              <div className="flex justify-between text-sm text-black">
                <p>{formatTime(currentTime)}</p>
                <p>{formatTime(duration)}</p>
              </div>

              <div className="relative flex w-full">
                <audio
                  ref={audioRef}
                  src={episode.episodeAudio}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                ></audio>

                <input
                  type="range"
                  className="w-full h-2 text-red-500  rounded-full shadow cursor-pointer"
                  value={currentTime}
                  max={duration || 0}
                  onChange={handleSeek}
                />
                <div className="flex gap-2 mx-8 relative items-center h-fit text-black">
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
