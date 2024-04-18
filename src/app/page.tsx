/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import { useContext, useState } from "react";
import { HomeContext } from "./context/HomeContext";
import { FaPause, FaPlay } from "react-icons/fa";
import { MdFullscreen } from "react-icons/md";
import videos, { Video } from "./data/video";
import { convertTimeToString } from "./utils/Utils";


export default function Home() {
  const [showFilter, setShowFilter] = useState(true);
  const {
    videoURL,
    playing,
    totalTime,
    currentTime,
    videoRef,
    canvasRef,
    playPause,
    configCurrentTime,
    configVideo,
    configFilter,
    currentVideoTitle,
  } = useContext(HomeContext);
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };
  return (
    <main className="mx-auto w-full h-full flex gap-4" >
      <div className="w-[65%] mr-1 ">
        <video
          className="w-full"
          ref={videoRef}
          src={videoURL}
          hidden={showFilter}
        ></video>
        <canvas
          className="w-full h-[380px]"
          ref={canvasRef}
          hidden={!showFilter}
        ></canvas>

        <div className="bg-black flex gap-8">
          <input
            className="appearance-none
                            [&::-webkit-slider-runnable-track]:appearance-none
                            [&::-webkit-slider-runnable-track]:bg-[#ff0000]
                            [&::-webkit-slider-runnable-track]:h-[10px]
                            [&::-webkit-slidershowFilter-thumb]:h-[10px]
                            [&::-webkit-slider-thumb]:w-[10px]
                            [&::-webkit-slider-thumb]:bg-[#000000]
                            "
            type="range"
            min={0}
            max={totalTime}
            value={currentTime}
            onChange={(e) => configCurrentTime(Number(e.target.value))}
          ></input>
          <button className="text-white" onClick={playPause}>
            {playing ? <FaPause /> : <FaPlay />}
          </button>
          <div className="telaCheia">
            <button className={`${fullscreen ? "fullscreen" : ""}`}>
            <MdFullscreen />
            </button>
          </div>
          <select
            onChange={(e) => configFilter(Number(e.target.value))}
            hidden={!showFilter}
          >
            <option selected value={0}>
              Sem filtro
            </option>
            <option value={1}>Verde</option>
            <option value={2}>Azul</option>
            <option value={3}>Vermelho</option>
            <option value={4}>Preto e branco</option>
          </select>
          <input
            type="checkbox"
            name="Filtro"
            onChange={() => setShowFilter(!showFilter)}
          />
          <div className="timeVideo text-white flex gap-8">
            <span className="">
              {convertTimeToString(currentTime)}
            </span>
            <span>
              {convertTimeToString(totalTime)}
            </span>
          </div>

          
        </div>
        <div className="content p-4">
          <h1 className="title"> {currentVideoTitle} </h1>
        </div>
      </div>
      <div className="w-[35%] h-[100vh] overflow-y-auto">
        {videos.map((video: Video, index) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <button className="w-full" onClick={(e) => configVideo(index)}>
              <img
                key={index}
                className="w-full h-[200px] mb-1 scroll-m-2"
                src={video.imageURL}
              ></img>
            </button>
          );
        })}
      </div>
    </main>
  );
}
