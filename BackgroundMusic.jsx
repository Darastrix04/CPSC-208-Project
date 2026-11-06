import React, { useEffect, useRef } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef(new Audio('/ASSETS/SFX/MENU/darkness music.wav'));

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;


    const handleFirstInteraction = () => {

      audio.play()
        .then(() => {
          window.removeEventListener('click', handleFirstInteraction);
          window.removeEventListener('keydown', handleFirstInteraction);
        })
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);


    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);


  return null;


}