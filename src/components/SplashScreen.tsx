import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

type Props = {
  onFinish?: () => void;
  src?: string; 
  poster?: string;
  allowSkip?: boolean;
  durationFallback?: number;
};

const SplashScreen: React.FC<Props> = ({
  onFinish,
  src = "/logo-intro.mp4",
  poster,
  allowSkip = true,
  durationFallback = 4500,
}) => {
  const vidRef = useRef<HTMLVideoElement | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const video = vidRef.current;
    let fallbackTimer: number | undefined;

    const handleEnded = () => {
      setVisible(false);
      window.setTimeout(() => onFinish?.(), 0);
    };

    const handlePlay = () => {
      
      fallbackTimer = window.setTimeout(() => {
        if (visible) {
          setVisible(false);
          window.setTimeout(() => onFinish?.(), 0);
        }
      }, durationFallback + 1200);
    };

    if (video) {
      video.addEventListener("ended", handleEnded);
      video.addEventListener("play", handlePlay);

      
      const p = video.play?.();
      if (p && typeof p.then === "function") {
        p.catch(() => {
         
          fallbackTimer = window.setTimeout(() => {
            setVisible(false);
            onFinish?.();
          }, durationFallback);
        });
      }
    }

    const escHandler = (e: KeyboardEvent) => {
      if (allowSkip && e.key === "Escape") {
        video?.pause();
        setVisible(false);
        window.setTimeout(() => onFinish?.(), 200);
      }
    };
    window.addEventListener("keydown", escHandler);

    return () => {
      if (video) {
        video.removeEventListener("ended", handleEnded);
        video.removeEventListener("play", handlePlay);
      }
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      window.removeEventListener("keydown", escHandler);
    };
    
  }, [onFinish, allowSkip, durationFallback, visible]);

  const handleSkip = () => {
    if (!allowSkip) return;
    vidRef.current?.pause();
    setVisible(false);
    window.setTimeout(() => onFinish?.(), 200);
  };

  return (
    <Wrapper data-visible={visible ? "true" : "false"} onClick={handleSkip} role="dialog" aria-label="Intro splash">
      <Backdrop />
      <Inner>
        <Video
          ref={vidRef}
          src={src}
          poster={poster}
          muted
          playsInline
          autoPlay
          preload="auto"
        />
      </Inner>
    </Wrapper>
  );
};

export default SplashScreen;


const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  transition: opacity 0.6s ease, transform 0.6s ease;
  opacity: ${({ "data-visible": v }: any) => (v === "true" ? 1 : 0)};
  pointer-events: auto;

  &[data-visible="false"] {
    pointer-events: none;
    transform: translateY(-6px) scale(0.996);
  }
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.95) 70%);
`;

const Inner = styled.div`
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
`;

const Video = styled.video`
  width: min(64vw, 820px);
  max-width: 92%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 30px 90px rgba(0,0,0,0.6), 0 10px 36px rgba(0,0,0,0.4);
  background: #000;
  pointer-events: none;

  @media (max-width: 520px) {
    width: min(86vw, 420px);
  }
`;
