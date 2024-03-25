'use client'

import { useContext } from "react";
import { HomeContext } from "./context/HomeContext";
import { FaPause, FaPlay } from "react-icons/fa";

export default function Home() {
  const {
    videoURL,
    playing,
    videoRef,
    playPause,
    totalTime,
    currentTime,
    configCurrentTime
  } = useContext(HomeContext);
  return (
    <main className="">
      <ul className="bg-gray-800 text-opacity-10 p-4 ">
        <li className="font-bold text-center text-zinc-50">
          URL: {videoURL} - {playing ? "true" : "false"}
        </li>
      </ul>

      <div className=" bg-gray-950 text-center ">
        <div className="flex justify-center">
          <video ref={videoRef} className="pt-4" controls src={videoURL}></video>
        </div>
        <div className="flex-col flex items-center pt-2 gap-1">
          <input 
            type="range" 
            min={0} 
            max={totalTime} 
            value={currentTime} 
            onChange={
              (e)=>configCurrentTime(Number(e.target.value))}
          />
          <button className="bg-orange-400 p-2 mt-4 rounded-xl mb-4" onClick={playPause} >

            { playing ? <FaPause /> : <FaPlay /> }
             
          </button>
        </div>
      </div>
    </main>
  );
}
