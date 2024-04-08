"use client";

import { useContext } from "react";
import { HomeContext } from "./context/HomeContext";
import { FaPause, FaPlay } from "react-icons/fa";
import videos from "./data/videos";

export default function Home() {
  const {
    videoURL,
    playing,
    videoRef,
    canvasRef,
    playPause,
    totalTime,
    currentTime,
    configCurrentTime,
    configVideo
  } = useContext(HomeContext);
  return (
    <main className="mx-auto w-[100%] flex">

      <div className="w-[65%] mr-1 bg-gray-950 text-center ">
        <div className="">
          <video
            ref={videoRef}
            className="pt-4 mt-1"
            controls
            src={videoURL}
            hidden
          ></video>
        </div>
          <canvas className="w-full has-[380px]" ref={canvasRef}></canvas> 
        <div className="w-[35%]" >
          {
             videos.map((video:Video, index) => {
              return (
                <button key={index} className="w-full" onClick={(e) => configVideo(index)}>
                  <img  className="w-full h-[200px] mb-1" src={video.imageURL}></img>
                </button>
              )
            })
          }
        </div>
        <div className="pt-2 gap-1">
          <input
            type="range"
            min={0}
            max={totalTime}
            value={currentTime}
            onChange={(e) => configCurrentTime(Number(e.target.value))}
          />
          <button
            className="bg-orange-400 p-2 mt-4 rounded-xl mb-4"
            onClick={playPause}
          >
            {playing ? <FaPause /> : <FaPlay />}
          </button>
        </div>
        
      </div>
    </main>
  );
}

