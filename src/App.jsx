import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { Howl, Howler } from "howler";

import selectSound from "./assets/audio/mc-select.mp3";
import endSound from "./assets/audio/xp-sound.mp3";
import clockSound from "./assets/audio/clock-sound.mp3";
import musicSound from "./assets/audio/music-mc.mp3";

import "./index.css";

function App() {
  // states
  // control to set the break time
  const [breakTime, setBreakTime] = useState(5);
  const [workTime, setWorkTime] = useState(25);

  // control to know if the timer is currently running and to play relaxing mc music
  const [isRunning, setIsRunning] = useState(false);
  const [reload, setReload] = useState(true);

  // states to know the current time. Mins and seconds
  const [timeSec, setTimeSec] = useState(0);
  const [timeMin, setTimeMin] = useState(25);

  // audio assets
  const select = new Howl({
    src: [selectSound],
    html5: true,
  });

  const end = new Howl({
    src: [endSound],
    html5: true,
    volume: 0.5,
  });

  const clock = new Howl({
    src: [clockSound],
    htmls: true,
    volume: 0.2,
  });

  const music = new Howl({
    src: [musicSound],
    html5: true,
    volume: 0.2,
    loop: true,
  });

  // use effect to set a counter
  useEffect(() => {
    if (isRunning) {
      if (reload) {
        music.play();
        setReload(false);
      }
      clock.play();
      const intervalId = setInterval(() => {
        if (timeSec > 0) {
          setTimeSec((timeSec) => timeSec - 1);
        }

        if (timeSec == 0) {
          setTimeMin((timeMin) => timeMin - 1);
          setTimeSec(59);
        }

        if (timeMin === 0 && timeSec === 0) {
          setTimeMin(breakTime);
          setTimeSec(0);
          end.play();
          music.pause();
          setReload(true);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timeSec, timeMin, isRunning]);

  const decBreak = () => {
    select.play();
    if (breakTime > 1) {
      setBreakTime((breakTime) => breakTime - 1);
    }
  };

  const incBreak = () => {
    select.play();
    setBreakTime((breakTime) => breakTime + 1);
  };

  const decWork = () => {
    select.play();
    if (timeMin > 1) {
      setTimeMin((timeMin) => timeMin - 1);
      setWorkTime((workTime) => workTime - 1);
    }
  };

  const incWork = () => {
    select.play();
    setTimeMin((timeMin) => timeMin + 1);
    setWorkTime((workTime) => workTime + 1);
  };

  const disen = (e) => {
    const decBtn = document.getElementById("dec-work-btn");
    const incBtn = document.getElementById("inc-work-btn");
    if (!e) {
      decBtn.disabled = true;
      incBtn.disabled = true;
      decBtn.classList.add("disabled");
      incBtn.classList.add("disabled");
    } else {
      decBtn.disabled = false;
      incBtn.disabled = false;
      decBtn.classList.remove("disabled");
      incBtn.classList.remove("disabled");
    }
  };

  const play = () => {
    disen(false);
    select.play();
    setIsRunning(true);
  };

  const pause = () => {
    select.play();
    setIsRunning(false);
  };

  const reset = () => {
    select.play();
    music.pause();
    setIsRunning(false);
    setTimeMin(workTime);
    setTimeSec(0);
    setReload(true);
    disen(true);
  };

  return (
    <>
      <div className="bg"></div>
      <div className="wrapper">
        <div className="container">
          <h1 className="title">Minecraft pomodoro</h1>

          <div className="selection">
            <div className="table-2">
              <div>
                <h2 className="label">Break length</h2>
                <div className="table-3">
                  <button onClick={decBreak} className="mc-button">
                    -
                  </button>
                  <h2>{breakTime}</h2>
                  <button onClick={incBreak} className="mc-button">
                    +
                  </button>
                </div>
              </div>
              <div>
                <h2 className="label">Time length</h2>
                <div className="table-3">
                  <button
                    id="dec-work-btn"
                    onClick={decWork}
                    className="mc-button"
                  >
                    -
                  </button>
                  <h2>{workTime}</h2>
                  <button
                    id="inc-work-btn"
                    onClick={incWork}
                    className="mc-button"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="timer">
            <h1 className="timer-num">
              {timeMin}:{timeSec < 10 ? "0" + timeSec : timeSec}
            </h1>
          </div>

          <div className="selection">
            <div className="controls">
              <div className="table-3">
                <button onClick={play} className="mc-button">
                  <FontAwesomeIcon
                    className="f-awesome"
                    icon={faPlay}
                    style={{ color: "#ffffff" }}
                  />
                </button>
                <button onClick={pause} className="mc-button">
                  <FontAwesomeIcon
                    className="f-awesome"
                    icon={faPause}
                    style={{ color: "#ffffff" }}
                  />
                </button>
                <button onClick={reset} className="mc-button">
                  <FontAwesomeIcon
                    className="f-awesome"
                    icon={faRepeat}
                    style={{ color: "#ffffff" }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sign">
        <p>made with so much 💖 by cherry 🍒</p>
      </div>
    </>
  );
}

export default App;
