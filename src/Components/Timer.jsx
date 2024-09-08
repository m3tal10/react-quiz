import { useEffect } from "react";

function Timer({ secondsRemaining, dispatch }) {
  let mins = Math.floor(secondsRemaining / 60);
  let secs = secondsRemaining - mins * 60;
  if (mins < 10) {
    mins = `0${mins}`;
  }
  if (secs < 10) {
    secs = `0${secs}`;
  }
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="timer">
      {mins}:{secs}
    </div>
  );
}

export default Timer;
