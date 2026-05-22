"use client";

import { useState, useEffect, useRef } from "react";

interface AudioPlayerProps {
  src: string;
  title?: string;
}

// 确定性的伪随机数生成器
function seededRandom(seed: number): () => number {
  return function() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

// 使用音频URL作为种子生成一致的波形数据
function generateWaveformData(src: string): number[] {
  // 从URL生成种子
  let seed = 0;
  for (let i = 0; i < src.length; i++) {
    seed = (seed * 31 + src.charCodeAt(i)) % 1000000;
  }
  
  const random = seededRandom(seed);
  const data = [];
  for (let i = 0; i < 60; i++) {
    data.push(random() * 0.8 + 0.2);
  }
  return data;
}

export function AudioPlayer({ src, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);
  // 使用音频URL作为种子生成确定性的波形数据
  const [waveformData] = useState(() => generateWaveformData(src));

  useEffect(() => {
    setIsClient(true);
    
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
  };

  return (
    <figure className="my-8 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
      {title && (
        <figcaption className="mb-3 text-sm text-[var(--text-primary)]">
          {title}
        </figcaption>
      )}
      <div className="flex items-center gap-3">
        {/* 播放按钮 */}
        <button
          onClick={togglePlay}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-[var(--bg-primary)] hover:opacity-80 transition-opacity"
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

        {/* 波形可视化区域 */}
        <div className="flex-1">
          {/* 波形条 */}
          <div className="flex items-end gap-0.5 h-8 mb-2">
            {waveformData.map((height, index) => {
              const isActive = (index / waveformData.length) * 100 <= progress;
              return (
                <div
                  key={index}
                  className={`flex-1 rounded-full transition-all duration-75 ${
                    isActive
                      ? "bg-[var(--accent)]"
                      : "bg-[var(--border)]"
                  }`}
                  style={{
                    height: `${height * 100}%`,
                    opacity: isActive ? 1 : 0.5,
                  }}
                />
              );
            })}
          </div>

          {/* 进度条和时间 */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--text-secondary)] min-w-[45px]">
              {formatTime(currentTime)}
            </span>
            <div
              className="flex-1 h-1 bg-[var(--border)] rounded-full cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-[var(--accent)] rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-[var(--text-secondary)] min-w-[45px] text-right">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>

      {/* 隐藏的原生 audio 元素 */}
      <audio ref={audioRef} src={src} preload="metadata" />
    </figure>
  );
}
