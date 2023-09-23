import { useEffect } from "react";

function Timer({ dispatch, isRunning, secondsRunning }) {
  const minutes = Math.floor(secondsRunning / 60);
  const seconds = secondsRunning % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "timerTick" });
      }, 1000);

      if (!isRunning) clearInterval(id);
      return () => clearInterval(id);
    },
    [isRunning, dispatch]
  );

  return (
    <div>
      <strong>
        {minutes < 10 ? "0" : null}
        {minutes}
      </strong>
      :
      <strong>
        {seconds < 10 ? "0" : null}
        {seconds}
      </strong>
    </div>
  );
}

export default Timer;
