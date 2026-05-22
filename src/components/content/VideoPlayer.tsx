"use client";

import { useState, useEffect, useRef } from "react";

interface VideoPlayerProps {
  src: string;
  title?: string;
  poster?: string;
}

const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];

export function VideoPlayer({ src, title, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    const updateDuration = () => {
      setDuration(video.duration);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const toggleFullscreen = () => {
    const container = videoRef.current?.parentElement;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.volume = Math.max(0, Math.min(1, percent));
    setVolume(video.volume);
    setIsMuted(video.volume === 0);
  };

  const handleSpeedChange = (rate: number) => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = rate;
      setPlaybackRate(rate);
    }
    setShowSpeedMenu(false);
  };

  return (
    <figure className="my-8 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden">
      {title && (
        <figcaption className="px-4 py-3 text-sm text-[var(--text-primary)] border-b border-[var(--border)]">
          {title}
        </figcaption>
      )}
      
      <div className="relative">
        {/* 视频容器 */}
        <div className="relative bg-black">
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            preload="metadata"
            className="w-full aspect-video object-contain"
          >
            Your browser does not support video playback.
          </video>

          {/* 播放遮罩层 */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity ${
              isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
            } bg-black/30`}
            onClick={togglePlay}
          >
            <button
              className="w-16 h-16 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-[var(--bg-primary)] transition-all hover:scale-110"
              aria-label="Play"
            >
              <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>

          {/* 控制栏 */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            {/* 进度条 */}
            <div
              className="h-1 bg-white/30 rounded-full cursor-pointer mb-3"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-[var(--accent)] rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* 控制按钮 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* 播放/暂停按钮 */}
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-[var(--accent)] transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                {/* 时间显示 */}
                <span className="text-white/80 text-xs">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* 倍速控制 */}
                <div className="relative">
                  <button
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="text-white hover:text-[var(--accent)] transition-colors text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20"
                    aria-label={`Playback speed: ${playbackRate}x`}
                  >
                    {playbackRate}x
                  </button>
                  
                  {showSpeedMenu && (
                    <div className="absolute bottom-full right-0 mb-2 bg-gray-900 rounded-lg shadow-xl py-1 min-w-[60px]">
                      {playbackRates.map((rate) => (
                        <button
                          key={rate}
                          onClick={() => handleSpeedChange(rate)}
                          className={`w-full px-3 py-1.5 text-left text-xs transition-colors ${
                            playbackRate === rate
                              ? "text-[var(--accent)] bg-white/10"
                              : "text-white hover:bg-white/10"
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 音量控制 */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-[var(--accent)] transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted || volume === 0 ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM3 9v6h4l5 5V4L7 9H3z" />
                      </svg>
                    ) : volume < 0.5 ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 9v6h4l5 5V4l-5 5H7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89 1.19 5 4.06 5 7.71s-2.11 6.52-5 7.71v2.06c4.01-1.29 7-4.95 7-9.77s-2.99-8.48-7-9.77z" />
                      </svg>
                    )}
                  </button>
                  <div
                    className="w-16 h-1 bg-white/30 rounded-full cursor-pointer"
                    onClick={handleVolumeChange}
                  >
                    <div
                      className="h-full bg-white rounded-full transition-all"
                      style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                    />
                  </div>
                </div>

                {/* 全屏按钮 */}
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-[var(--accent)] transition-colors"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
