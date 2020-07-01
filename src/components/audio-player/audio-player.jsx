import React, {useState, useRef, useEffect} from "react";
import PropTypes from "prop-types";

const AudioPlayer = (props) => {
  const {src, isPlay} = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(isPlay);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = src;

    audio.oncanplaythrough = () => setIsLoading(false);

    if (isPlay && isPlaying) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }

  }, [isPlay, isPlaying]);

  return (
    <>
      <button
        className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
        type="button"
        disabled={isLoading}
        onClick={() => setIsPlaying(!isPlaying)}
      />
        <div className="track__status">
          <audio ref={audioRef} />
        </div>
    </>
  );
};

AudioPlayer.propTypes = {
  isPlay: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
};

export default AudioPlayer;
