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
import { fetchWeatherApi } from "openmeteo";
import { GoDash } from "react-icons/go";
import { MdNightlight } from "react-icons/md";

interface Result {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
}

interface Weather {
  feelsLike: number;
  humidity: number;
  wind: number;
  precipitation: number;
  currentTemp: number;
  isDay: number;
  timeLine: Date;
  dailyTime: Date[];
  hourlyTime: Date[];
  maxTemperature: Float32Array<ArrayBufferLike> | null;
  minTemperature: Float32Array<ArrayBufferLike> | null;
}

const Home = () => {
  const [showDays, setShowDays] = useState(false);
  const [toggleUnits, setToggleUnits] = useState(false);
  const [imperial, setImperial] = useState(true); // Imperial, Metric
  const [place, setPlace] = useState("");
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Result[]>([]);
  const [searchNotFound, setSearchNotFound] = useState(false);
  const [erroredAPI, setErroredAPI] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [weatherData, setWeatherData] = useState<Weather>();
  const [hourlyHours, setHourlyHours] = useState<Date[]>([]);
  const [hourlyTemperature, setHourlyTemperature] =
    useState<Float32Array | null>();
  const [targetPlace, setTargetPlace] = useState<Result>();
  const [target_Place, setTarget_Place] = useState<Result>();

  const fetchLocation = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search/?name=${place}`
    );
    const data = await response.json();
    setTargetPlace(data.results?.[0]);

    setSearchResults(data.results);
  };

  function debounce(callback: () => void, delay: number) {
    let timer: NodeJS.Timeout;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback();
      }, delay);
    };
  }

  const fetchWeatherData = async (
    e: React.FormEvent<HTMLElement>,
    lat: number,
    lon: number
  ) => {
    e.preventDefault();
    setFetching(true);
    setLoading(true);
    setSearchResults([]);
    try {
      const params = {
        latitude: lat,
        longitude: lon,
        wind_speed_unit: "mph",
        temperature_unit: "fahrenheit",
        precipitation_unit: "inch",
        daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
        hourly: [
          "temperature_2m",
          "relative_humidity_2m",
          "precipitation",
          "wind_speed_180m",
          "weather_code",
        ],
        current: [
          "temperature_2m",
          "relative_humidity_2m",
          "wind_speed_10m",
          "precipitation",
          "is_day",
        ],
      };
      const url = "https://api.open-meteo.com/v1/forecast";
      const responses = await fetchWeatherApi(url, params);
      const response = responses[0];
      const latitude = response.latitude();
      const longitude = response.longitude();
      const elevation = response.elevation();
      const utcOffsetSeconds = response.utcOffsetSeconds();

      const current = response.current()!;
      const hourly = response.hourly()!;
      const daily = response.daily()!;

      const weatherData = {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature_2m: current.variables(0)!.value(),
          relative_humidity_2m: current.variables(1)!.value(),
          wind_speed_10m: current.variables(2)!.value(),
          precipitation: current.variables(3)!.value(),
          is_day: current.variables(4)!.value(),
        },
        hourly: {
          time: [
            ...Array(
              (Number(hourly.timeEnd()) - Number(hourly.time())) /
                hourly.interval()
            ),
          ].map(
            (_, i) =>
              new Date(
                (Number(hourly.time()) +
                  i * hourly.interval() +
                  utcOffsetSeconds) *
                  1000
              )
          ),
          temperature_2m: hourly.variables(0)!.valuesArray(),
          relative_humidity_2m: hourly.variables(1)!.valuesArray(),
          precipitation: hourly.variables(2)!.valuesArray(),
          wind_speed_180m: hourly.variables(3)!.valuesArray(),
          weather_code: hourly.variables(4)!.valuesArray(),
        },
        daily: {
          time: [
            ...Array(
              (Number(daily.timeEnd()) - Number(daily.time())) /
                daily.interval()
            ),
          ].map(
            (_, i) =>
              new Date(
                (Number(daily.time()) +
                  i * daily.interval() +
                  utcOffsetSeconds) *
                  1000
              )
          ),
          temperature_2m_max: daily.variables(0)!.valuesArray(),
          temperature_2m_min: daily.variables(1)!.valuesArray(),
          weather_code: daily.variables(2)!.valuesArray(),
        },
      };

      setWeatherData({
        ...weatherData,
        timeLine: weatherData.current.time,
        isDay: weatherData.current.is_day,
        currentTemp: weatherData.current.temperature_2m,
        precipitation: weatherData.current.precipitation,
        humidity: weatherData.current.relative_humidity_2m,
        wind: weatherData.current.wind_speed_10m,
        feelsLike: weatherData.current.temperature_2m,
        dailyTime: weatherData.daily.time,
        hourlyTime: weatherData.hourly.time,
        maxTemperature: weatherData?.daily.temperature_2m_max,
        minTemperature: weatherData?.daily.temperature_2m_min,
      });

      setHourlyHours(
        weatherData?.hourly?.time
          .filter((x) => new Date(x).getHours() >= new Date().getHours())
          .slice(0, 8)
      );
      hourlyHours.map((hour) =>
        hour.getHours() > 12 ? hour.getHours() - 12 : hour.getHours()
      );

      setHourlyTemperature(
        weatherData?.hourly?.temperature_2m
          ? weatherData.hourly.temperature_2m.slice(0, 8)
          : null
      );

      setTarget_Place(targetPlace)
    } catch (error) {
      setErroredAPI(true);
    } finally {
      setFetching(false);
      setLoading(false);
      setPlace("");
    }
  };

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

      <h2 className="text-center my-10 font-BG">
        How's the sky looking today?
      </h2>

      <form className="flex justify-center relative gap-5 my-10 px-40 items-center p-3">
        <div className="flex gap-2 items-center bg-neutral800 p-3 px-5 w-96 rounded-md">
          <CiSearch />
          <input
            name="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            onKeyUp={(e) => fetchLocation(e)}
            placeholder="Search for a place..."
            className="outline-none"
          />
        </div>

        {searchResults && (
          <div
            className={`bg-neutral800 w-96 left-96 top-16 p-2 rounded-md z-50 absolute ${
              searchResults.length === 0 ? "hidden" : ""
            }`}
          >
            {searchResults.slice(0, 5).map((result) => (
              <p
                key={result?.id}
                onClick={(e) =>
                  fetchWeatherData(e, result.latitude, result.longitude)
                }
                className="hover:bg-neutral600 border border-neutral800 hover:border transition-all hover:border-white p-2 cursor-pointer"
              >
                {result.name}
              </p>
            ))}
          </div>
        )}

        <button
          // onClick={(e)=>fetchWeatherData(e,searchResults[0].latitude,searchResults[0].longitude)}
          className={`bg-blue500 p-3 px-5 rounded-lg ${
            !place ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {fetching ? "Fetching..." : " Search"}
        </button>
      </form>

      <div className="canvas grid grid-cols-3 grid-rows-3 gap-10 w-full my-10 px-20 pb-5 overflow-x-clip">
        <div className="nowForecast rounded-lg p-3 pt-0 col-start-1 col-end-3 row-start-1 row-end-3 grid grid-cols-4 grid-rows-3 gap-10">
          <div className="col-start-1 relative col-end-5 row-start-1 row-end-3 bg-blue500 rounded-lg flex p-3 justify-between items-center">
            {weatherData?.isDay ? (
              <IoMdSunny className="text-orange absolute top-20 right-48 to-orange-300 text-5xl" />
            ) : (
              <MdNightlight className="text-orange absolute top-20 right-48 to-orange-300 text-5xl" />
            )}
            {weatherData?.isDay ? (
              <IoMdSunny className="text-orange absolute bottom-10 left-64" />
            ) : (
              <MdNightlight className="text-orange absolute bottom-10 left-64" />
            )}
            {weatherData?.isDay ? (
              <IoMdSunny className="text-orange absolute top-5 left-72" />
            ) : (
              <MdNightlight className="text-orange absolute top-5 left-72" />
            )}
            <div>
              <h5 className="">
                {target_Place
                  ? target_Place.name + ", " + target_Place.country
                  : "--"}
              </h5>
              <p className="p8">{new Date().toDateString()}</p>
            </div>
            <h1>
              {Math.round(weatherData?.feelsLike ? weatherData.feelsLike : 0)}
              &deg;
            </h1>
          </div>
          <div className="col-start-1 col-end-2 row-start-3 row-end-4 bg-neutral600 p-3 rounded-md flex flex-col gap-5">
            <p>Feels Like</p>
            <h6>
              {weatherData?.feelsLike ? (
                Math.round(weatherData?.feelsLike)
              ) : (
                <GoDash />
              )}

              {imperial ? "°F" : "°C"}
            </h6>
          </div>
          <div className="col-start-2 col-end-3 row-start-3 row-end-4 bg-neutral600 p-3 rounded-md flex flex-col gap-5">
            <p>Humidity</p>
            <h6>
              {weatherData?.humidity ? weatherData?.humidity + "%" : <GoDash />}
            </h6>
          </div>
          <div className="col-start-3 col-end-4 row-start-3 row-end-4 bg-neutral600 p-3 rounded-md flex flex-col gap-5">
            <p>Wind</p>
            <h6>
              {weatherData?.wind ? Math.round(weatherData?.wind) : <GoDash />}{" "}
              {imperial ? "mph" : "km/h"}
            </h6>
          </div>
          <div className="col-start-4 col-end-5 row-start-3 row-end-4 bg-neutral600 p-3 rounded-md flex flex-col gap-5">
            <p>Precipitation</p>
            <h6>
              {weatherData?.precipitation ? (
                <>
                  weatherData?.precipitation
                  {imperial ? "in" : "mm"}
                </>
              ) : (
                <GoDash />
              )}{" "}
            </h6>
          </div>
        </div>
        <div className="hourlyForecast relative bg-neutral800 flex flex-col p-3 gap-5 rounded-lg col-start-3 row-start-1 row-end-4 col-end-4">
          <div className="flex items-center justify-between">
            <p>Hourly Forecast</p>
            <div
              onClick={() => setShowDays(!showDays)}
              className="flex items-center cursor-pointer justify-between gap-2"
            >
              <p>
                {weatherData?.dailyTime?.[0]
                  ? new Date(weatherData.dailyTime[0]).getDay() === 0
                    ? "Sunday"
                    : new Date(weatherData.dailyTime[0]).getDay() === 1
                    ? "Monday"
                    : new Date(weatherData.dailyTime[0]).getDay() === 2
                    ? "Tuesday"
                    : new Date(weatherData.dailyTime[0]).getDay() === 3
                    ? "Wednesday"
                    : new Date(weatherData.dailyTime[0]).getDay() === 4
                    ? "Thursday"
                    : new Date(weatherData.dailyTime[0]).getDay() === 5
                    ? "Friday"
                    : new Date(weatherData.dailyTime[0]).getDay() === 6
                    ? "Saturday"
                    : ""
                  : "--"}
              </p>
              <RxCaretDown></RxCaretDown>
            </div>
          </div>
          {showDays && (
            <div className="flex flex-col gap-2 absolute right-0 p-2 top-10 rounded-md bg-neutral800">
              {weatherData?.dailyTime.map((time, index) => (
                <p
                  key={index}
                  className="p7 hover:bg-neutral600 cursor-pointer px-2 rounded-sm"
                >
                  {new Date(time).getDay() === 0
                    ? "Sunday"
                    : new Date(time).getDay() === 1
                    ? "Monday"
                    : new Date(time).getDay() === 2
                    ? "Tuesday"
                    : new Date(time).getDay() === 3
                    ? "Wednesday"
                    : new Date(time).getDay() === 4
                    ? "Thursday"
                    : new Date(time).getDay() === 5
                    ? "Friday"
                    : "Saturday"}
                </p>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center cardPadding bg-neutral600 rounded-sm">
            <div className="flex justify-between items-center gap-2">
              <FaCloud />
              <p>
                {hourlyHours[0]
                  ? hourlyHours[0].toLocaleTimeString([], {
                      hour: "2-digit",
                    })
                  : "--"}
              </p>
            </div>
            <p>
              {hourlyTemperature ? Math.round(hourlyTemperature[0]) : "--"}&deg;
            </p>
          </div>
          <div className="flex justify-between items-center cardPadding bg-neutral600 rounded-sm">
            <div className="flex justify-between items-center gap-2">
              <IoMdPartlySunny />
              <p>
                {hourlyHours[1]
                  ? hourlyHours[1].toLocaleTimeString([], {
                      hour: "2-digit",
                    })
                  : "--"}
              </p>
            </div>
            <p>
              {hourlyTemperature ? Math.round(hourlyTemperature[1]) : "--"}&deg;
            </p>
          </div>
          <div className="flex justify-between items-center cardPadding bg-neutral600 rounded-sm">
            <div className="flex justify-between items-center gap-2">
              <IoMdSunny />
              <p>
                {hourlyHours[2]
                  ? hourlyHours[2].toLocaleTimeString([], {
                      hour: "2-digit",
                    })
                  : "--"}
              </p>
            </div>
            <p>
              {hourlyTemperature ? Math.round(hourlyTemperature[2]) : "--"}&deg;
            </p>
          </div>
          <div className="flex justify-between items-center cardPadding bg-neutral600 rounded-sm">
            <div className="flex items-center justify-between gap-2">
              <BsFillCloudSnowFill />
              <p>
                {hourlyHours[3]
                  ? hourlyHours[3].toLocaleTimeString([], {
                      hour: "2-digit",
                    })
                  : "--"}
              </p>
            </div>
            <p>
              {hourlyTemperature ? Math.round(hourlyTemperature[3]) : "--"}&deg;
            </p>
          </div>
          <div className="flex justify-between items-center cardPadding bg-neutral600 rounded-sm">
            <div className="flex items-center justify-between gap-2">
              <WiCloudyWindy />
              <p>
                {hourlyHours[4]
                  ? hourlyHours[4].toLocaleTimeString([], {
                      hour: "2-digit",
                    })
                  : "--"}
              </p>
            </div>
            <p>
              {hourlyTemperature ? Math.round(hourlyTemperature[4]) : "--"}&deg;
            </p>
          </div>
          <div className="flex justify-between items-center cardPadding bg-neutral600 rounded-sm">
            <div className="flex justify-between items-center gap-2">
              <BsFillCloudSnowFill />
              <p>
                {hourlyHours[5]
                  ? hourlyHours[5].toLocaleTimeString([], {
                      hour: "2-digit",
                    })
                  : "--"}
              </p>
            </div>
            <p>
              {hourlyTemperature ? Math.round(hourlyTemperature[5]) : "--"}&deg;
            </p>
          </div>
          <div className="flex justify-between items-center cardPadding bg-neutral600 rounded-sm">
            <div className="flex justify-between-between items-center gap-2">
              <FaCloud />

              <p>
                {hourlyHours[6]
                  ? hourlyHours[6].toLocaleTimeString([], {
                      hour: "2-digit",
                    })
                  : "--"}
              </p>
            </div>
            <p>
              {hourlyTemperature ? Math.round(hourlyTemperature[6]) : "--"}&deg;
            </p>
          </div>
          <div className="flex justify-between items-center cardPadding bg-neutral600 rounded-sm">
            <div className="flex items-center justify-between gap-2">
              <FaCloud />
              <p>
                {hourlyHours[7]
                  ? hourlyHours[7].toLocaleTimeString([], {
                      hour: "2-digit",
                    })
                  : "--"}
              </p>
            </div>
            <p>
              {hourlyTemperature ? Math.round(hourlyTemperature[7]) : "--"}&deg;
            </p>
          </div>
        </div>
        <div className="dailyForecast rounded-lg col-start-1 col-end-3 row-start-3 row-end-4 flex flex-col gap-3">
          <p>Daily Forecast</p>
          <div className="flex justify-between items-center gap-2">
            {weatherData?.dailyTime.map((time, index) => (
              <div
                key={index}
                className="flex flex-col gap-5 w-fit bg-neutral600 h-auto p-2 items-center justify-center rounded-lg"
              >
                <p className="text-center">
                  {new Date(time).getDay() === 0
                    ? "Sun"
                    : new Date(time).getDay() === 1
                    ? "Mon"
                    : new Date(time).getDay() === 2
                    ? "Tue"
                    : new Date(time).getDay() === 3
                    ? "Wed"
                    : new Date(time).getDay() === 4
                    ? "Thur"
                    : new Date(time).getDay() === 5
                    ? "Fri"
                    : "Sat"}
                </p>
                <FaCloudRain />
                <div className="flex justify-between gap-7">
                  <p>
                    {weatherData.maxTemperature
                      ? Math.round(weatherData.maxTemperature[index])
                      : "--"}
                    &deg;
                  </p>
                  <p>
                    {weatherData.minTemperature
                      ? Math.round(weatherData.minTemperature[index])
                      : "--"}
                    &deg;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
