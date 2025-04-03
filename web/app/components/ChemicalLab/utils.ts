export const playSoundEffect = (type: "add" | "mix" | "success" | "error") => {
    const sounds = {
      add: new Audio("/sounds/bubble.mp3"),
      mix: new Audio("/sounds/pour.mp3"),
      success: new Audio("/sounds/success.mp3"),
      error: new Audio("/sounds/error.mp3"),
    };
  
    try {
      const sound = sounds[type];
      sound.volume = 0.3;
      sound.play();
  
      // Stop the sound after 4 seconds
      setTimeout(() => {
        sound.pause();
        sound.currentTime = 0;
      }, 4000);
    } catch (e) {
      console.log("Sound not loaded yet");
    }
  };
  