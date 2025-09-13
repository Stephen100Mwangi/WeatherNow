"use client";
import React, { useState } from "react";
import { PiGearBold } from "react-icons/pi";
import { RxCaretDown } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import { FaCloud } from "react-icons/fa";
import { BsFillCloudSnowFill } from "react-icons/bs";
import { IoMdPartlySunny, IoMdSunny } from "react-icons/io";
import { WiCloudyWindy } from "react-icons/wi";
import { FaCloudRain } from "react-icons/fa6";
import { LiaCheckSolid } from "react-icons/lia";

const Home = () => {
  const [showDays, setShowDays] = useState(false);
  const [toggleUnits, setToggleUnits] = useState(false);
  const [imperial, setImperial] = useState(true); // Imperial, Metric
  const [place, setPlace] = useState("");

  return (
    <main className="bg-background globalColor min-h-screen max-h-fit">
      <header className="flex relative justify-between p-10 px-20">
        <div className="flex items-center justify-center gap-3">
          <Image src="/WeatherLogo.png" alt="Logo" width={40} height={40} />
          <h4 className="font-">Weather Now</h4>
        </div>
        <div
          onClick={() => setToggleUnits(!toggleUnits)}
          className="select flex items-center cursor-pointer gap-2 rounded-sm justify-center bg-neutral600 px-2"
        >
          <PiGearBold />
          <p className="p8">Units</p>
          <RxCaretDown />
        </div>
        {toggleUnits && (
          <div className="absolute right-20 bg-neutral800 border border-white w-fit p-3 rounded-md top-20 shadow-sm flex flex-col gap-2 z-50">
            <p
              onClick={() => setImperial(!imperial)}
              className="font-bold cursor-pointer rounded-sm pl-2 hover:bg-neutral600"
            >
              {imperial ? "Switch to Metric" : "Switch to Imperial"}
            </p>
            <p className="text-xs font-thin pl-2">Temperature</p>
            <p
              className={`${
                !imperial && "bg-neutral600 rounded-sm"
              } pl-2 cursor-pointer flex p7 justify-start w-56 items-center`}
            >
              <span className="w-48">Celsius(&deg;C)</span>
              {!imperial && <LiaCheckSolid />}
            </p>
            <p
              className={`${
                imperial && "bg-neutral600 rounded-sm"
              } pl-2 cursor-pointer flex p7 justify-start w-56 items-center`}
            >
              <span className="w-48">Fahrenheit(&deg;F)</span>
              {imperial && <LiaCheckSolid />}
            </p>
            <p className="text-xs font-thin pl-2">Wind speed</p>
            <p
              className={`${
                !imperial && "bg-neutral600 rounded-sm"
              } pl-2 cursor-pointer flex p7 justify-start w-56 items-center`}
            >
              <span className="w-48">km/h</span>
              {!imperial && <LiaCheckSolid />}
            </p>
            <p
              className={`${
                imperial && "bg-neutral600 rounded-sm"
              } pl-2 cursor-pointer flex p7 justify-start w-56 items-center`}
            >
              <span className="w-48">mph</span>
              {imperial && <LiaCheckSolid />}
            </p>
            <p className="text-xs font-thin pl-2">Precipitation</p>
            <p
              className={`${
                !imperial && "bg-neutral600 rounded-sm"
              } pl-2 cursor-pointer flex p7 justify-start w-56 items-center`}
            >
              <span className="w-48">Millimeters(mm)</span>
              {!imperial && <LiaCheckSolid />}
            </p>
            <p
              className={`${
                imperial && "bg-neutral600 rounded-sm"
              } pl-2 cursor-pointer  flex p7 justify-start w-56 items-center`}
            >
              <span className="w-48">Inches(in)</span>
              {imperial && <LiaCheckSolid />}
            </p>
          </div>
        )}
      </header>

      <h2 className="text-center my-10 font-BG">How's the sky looking today?</h2>

      <form className="flex justify-center gap-5 my-10 px-40 items-center p-3">
        <div className="flex gap-2 items-center bg-neutral800 p-3 px-5 w-96 rounded-md">
          <CiSearch />
          <input
            name="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Search for a place..."
            className="outline-none"
          />
        </div>
        <button
          disabled
          className={`bg-blue500 p-3 px-5 rounded-lg ${
            !place ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Search
        </button>
      </form>

      <div className="canvas grid grid-cols-3 grid-rows-3 gap-10 w-full my-10 px-20 pb-5 overflow-x-clip">
        <div className="nowForecast rounded-lg p-3 pt-0 col-start-1 col-end-3 row-start-1 row-end-3 grid grid-cols-4 grid-rows-3 gap-10">
          <div className="col-start-1 relative col-end-5 row-start-1 row-end-3 bg-blue500 rounded-lg flex p-3 justify-between items-center">
            <IoMdSunny className="text-orange absolute top-20 right-48 to-orange-300 text-5xl" />
            <IoMdSunny className="text-orange absolute bottom-10 left-64" />
            <IoMdSunny className="text-orange absolute top-5 left-72" />
            <div>
              <h5 className="">Berlin, Germany</h5>
              <p className="p8">Tuesday, August 5, 2025</p>
            </div>
            <h1>68&deg;</h1>
          </div>
          <div className="col-start-1 col-end-2 row-start-3 row-end-4 bg-neutral600 p-3 rounded-md flex flex-col gap-5">
            <p>Feels Like</p>
            <h6>18&deg;</h6>
          </div>
          <div className="col-start-2 col-end-3 row-start-3 row-end-4 bg-neutral600 p-3 rounded-md flex flex-col gap-5">
            <p>Humidity</p>
            <h6>46%</h6>
          </div>
          <div className="col-start-3 col-end-4 row-start-3 row-end-4 bg-neutral600 p-3 rounded-md flex flex-col gap-5">
            <p>Wind</p>
            <h6>14 {imperial ? "mph" : "km/h"}</h6>
          </div>
          <div className="col-start-4 col-end-5 row-start-3 row-end-4 bg-neutral600 p-3 rounded-md flex flex-col gap-5">
            <p>Precipitation</p>
            <h6>0 {imperial ? "in" : "mm"}</h6>
          </div>
        </div>
        <div className="hourlyForecast relative bg-neutral800 flex flex-col p-3 gap-5 rounded-lg col-start-3 row-start-1 row-end-4 col-end-4">
          <div className="flex items-center justify-between">
            <p>Hourly Forecast</p>
            <div
              onClick={() => setShowDays(!showDays)}
              className="flex items-center cursor-pointer justify-between gap-2"
            >
              <p>Tuesday</p>
              <RxCaretDown></RxCaretDown>
            </div>
          </div>
          {showDays && (
            <div className="flex flex-col gap-2 absolute right-0 p-2 top-10 rounded-md bg-neutral800">
              <p className="p7 hover:bg-neutral600 cursor-pointer px-2 rounded-sm">
                Monday
              </p>
              <p className="p7 hover:bg-neutral600 cursor-pointer px-2 rounded-sm">
                Tuesday
              </p>
              <p className="p7 hover:bg-neutral600 cursor-pointer px-2 rounded-sm">
                Wednesday
              </p>
              <p className="p7 hover:bg-neutral600 cursor-pointer px-2 rounded-sm">
                Thursday
              </p>
              <p className="p7 hover:bg-neutral600 cursor-pointer px-2 rounded-sm">
                Friday
              </p>
              <p className="p7 hover:bg-neutral600 cursor-pointer px-2 rounded-sm">
                Saturday
              </p>
              <p className="p7 hover:bg-neutral600 cursor-pointer px-2 rounded-sm">
                Sunday
              </p>
            </div>
          )}

          <div className="flex justify-between items-center cardPadding bg-neutral600 rounded-sm">
            <div className="flex justify-between items-center gap-2">
              <FaCloud />
              <p>3 PM</p>
            </div>
            <p>20&deg;</p>
          </div>
          <div className="flex justify-between items-center cardPadding bg-neutral600 rounded-sm">
            <div className="flex justify-between items-center gap-2">
              <IoMdPartlySunny />
              <p>4 PM</p>
            </div>
            <p>20&deg;</p>
          </div>
          <div className="flex justify-between items-center cardPadding bg-neutral600 rounded-sm">
            <div className="flex justify-between items-center gap-2">
              <IoMdSunny />
              <p>4 PM</p>
            </div>
            <p>20&deg;</p>
          </div>
          <div className="flex justify-between items-center cardPadding bg-neutral600 rounded-sm">
            <div className="flex items-center justify-between gap-2">
              <BsFillCloudSnowFill />
              <p>6 PM</p>
            </div>
            <p>20&deg;</p>
          </div>
          <div className="flex justify-between items-center cardPadding bg-neutral600 rounded-sm">
            <div className="flex items-center justify-between gap-2">
              <WiCloudyWindy />
              <p>7 PM</p>
            </div>
            <p>20&deg;</p>
          </div>
          <div className="flex justify-between items-center cardPadding bg-neutral600 rounded-sm">
            <div className="flex justify-between items-center gap-2">
              <BsFillCloudSnowFill />
              <p>8 PM</p>
            </div>
            <p>20&deg;</p>
          </div>
          <div className="flex justify-between items-center cardPadding bg-neutral600 rounded-sm">
            <div className="flex justify-between-between items-center gap-2">
              <FaCloud />
              <p>9 PM</p>
            </div>
            <p>20&deg;</p>
          </div>
          <div className="flex justify-between items-center cardPadding bg-neutral600 rounded-sm">
            <div className="flex items-center justify-between gap-2">
              <FaCloud />
              <p>10 PM</p>
            </div>
            <p>20&deg;</p>
          </div>
        </div>
        <div className="dailyForecast rounded-lg col-start-1 col-end-3 row-start-3 row-end-4 flex flex-col gap-3">
          <p>Daily Forecast</p>
          <div className="flex justify-between items-center gap-2">
            <div className="flex flex-col gap-5 w-fit bg-neutral600 h-auto p-2 items-center justify-center rounded-lg">
              <p className="text-center">Tue</p>
              <FaCloudRain />
              <div className="flex justify-between gap-7">
                <p>21&deg;</p>
                <p>15&deg;</p>
              </div>
            </div>
            <div className="flex flex-col gap-5 w-fit bg-neutral600 p-2 items-center justify-center rounded-lg">
              <p className="text-center">Tue</p>
              <FaCloudRain />
              <div className="flex justify-between gap-7">
                <p>21&deg;</p>
                <p>15&deg;</p>
              </div>
            </div>
            <div className="flex flex-col gap-5 w-fit bg-neutral600 p-2 items-center justify-center rounded-lg">
              <p className="text-center">Tue</p>
              <FaCloudRain />
              <div className="flex justify-between gap-7">
                <p>21&deg;</p>
                <p>15&deg;</p>
              </div>
            </div>
            <div className="flex flex-col gap-5 w-fit bg-neutral600 p-2 items-center justify-center rounded-lg">
              <p className="text-center">Tue</p>
              <FaCloudRain />
              <div className="flex justify-between gap-7">
                <p>21&deg;</p>
                <p>15&deg;</p>
              </div>
            </div>
            <div className="flex flex-col gap-5 w-fit bg-neutral600 p-2 items-center justify-center rounded-lg">
              <p className="text-center">Tue</p>
              <FaCloudRain />
              <div className="flex justify-between gap-7">
                <p>21&deg;</p>
                <p>15&deg;</p>
              </div>
            </div>
            <div className="flex flex-col gap-5 w-fit bg-neutral600 p-2 items-center justify-center rounded-lg">
              <p className="text-center">Tue</p>
              <FaCloudRain />
              <div className="flex justify-between gap-7">
                <p>21&deg;</p>
                <p>15&deg;</p>
              </div>
            </div>
            <div className="flex flex-col gap-5 w-fit bg-neutral600 p-2 items-center justify-center rounded-lg">
              <p className="text-center">Tue</p>
              <FaCloudRain />
              <div className="flex justify-between gap-7">
                <p>21&deg;</p>
                <p>15&deg;</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
