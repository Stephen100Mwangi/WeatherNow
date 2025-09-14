// import { fetchWeatherApi } from 'openmeteo';

// const params = {
// 	"latitude": 51.5,
// 	"longitude": 10.5,
// 	"daily": ["temperature_2m_mean", "apparent_temperature_mean"],
// 	"hourly": ["temperature_2m", "apparent_temperature", "wind_speed_180m", "relative_humidity_2m", "precipitation", "precipitation_probability", "wind_speed_10m", "wind_speed_80m", "wind_speed_120m"],
// 	"current": ["temperature_2m", "relative_humidity_2m", "is_day", "apparent_temperature", "precipitation", "wind_speed_10m"],
// 	"timezone": "auto",
// 	"past_days": 7,
// 	"wind_speed_unit": "mph",
// 	"precipitation_unit": "inch",
// };
// const url = "https://api.open-meteo.com/v1/forecast";
// const responses = await fetchWeatherApi(url, params);

// // Process first location. Add a for-loop for multiple locations or weather models
// const response = responses[0];

// // Attributes for timezone and location
// const latitude = response.latitude();
// const longitude = response.longitude();
// const elevation = response.elevation();
// const timezone = response.timezone();
// const timezoneAbbreviation = response.timezoneAbbreviation();
// const utcOffsetSeconds = response.utcOffsetSeconds();

// console.log(
// 	`\nCoordinates: ${latitude}°N ${longitude}°E`,
// 	`\nElevation: ${elevation}m asl`,
// 	`\nTimezone: ${timezone} ${timezoneAbbreviation}`,
// 	`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
// );

// const current = response.current()!;
// const hourly = response.hourly()!;
// const daily = response.daily()!;

// // Note: The order of weather variables in the URL query and the indices below need to match!
// const weatherData = {
// 	current: {
// 		time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
// 		temperature_2m: current.variables(0)!.value(),
// 		relative_humidity_2m: current.variables(1)!.value(),
// 		is_day: current.variables(2)!.value(),
// 		apparent_temperature: current.variables(3)!.value(),
// 		precipitation: current.variables(4)!.value(),
// 		wind_speed_10m: current.variables(5)!.value(),
// 	},
// 	hourly: {
// 		time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
// 			(_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
// 		),
// 		temperature_2m: hourly.variables(0)!.valuesArray(),
// 		apparent_temperature: hourly.variables(1)!.valuesArray(),
// 		wind_speed_180m: hourly.variables(2)!.valuesArray(),
// 		relative_humidity_2m: hourly.variables(3)!.valuesArray(),
// 		precipitation: hourly.variables(4)!.valuesArray(),
// 		precipitation_probability: hourly.variables(5)!.valuesArray(),
// 		wind_speed_10m: hourly.variables(6)!.valuesArray(),
// 		wind_speed_80m: hourly.variables(7)!.valuesArray(),
// 		wind_speed_120m: hourly.variables(8)!.valuesArray(),
// 	},
// 	daily: {
// 		time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
// 			(_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
// 		),
// 		temperature_2m_mean: daily.variables(0)!.valuesArray(),
// 		apparent_temperature_mean: daily.variables(1)!.valuesArray(),
// 	},
// };

// // 'weatherData' now contains a simple structure with arrays with datetime and weather data
// console.log(
// 	`\nCurrent time: ${weatherData.current.time}`,
// 	`\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
// 	`\nCurrent relative_humidity_2m: ${weatherData.current.relative_humidity_2m}`,
// 	`\nCurrent is_day: ${weatherData.current.is_day}`,
// 	`\nCurrent apparent_temperature: ${weatherData.current.apparent_temperature}`,
// 	`\nCurrent precipitation: ${weatherData.current.precipitation}`,
// 	`\nCurrent wind_speed_10m: ${weatherData.current.wind_speed_10m}`,
// );
// console.log("\nHourly data", weatherData.hourly)
// console.log("\nDaily data", weatherData.daily)


import { fetchWeatherApi } from 'openmeteo';

const params = {
	"latitude": 52.52,
	"longitude": 13.41,
	"daily": ["temperature_2m_max", "temperature_2m_min", "weather_code"],
	"hourly": ["temperature_2m", "relative_humidity_2m", "precipitation", "wind_speed_180m", "weather_code"],
	"current": ["temperature_2m", "relative_humidity_2m", "wind_speed_10m", "precipitation", "is_day"],
	"wind_speed_unit": "mph",
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const latitude = response.latitude();
const longitude = response.longitude();
const elevation = response.elevation();
const utcOffsetSeconds = response.utcOffsetSeconds();

console.log(
	`\nCoordinates: ${latitude}°N ${longitude}°E`,
	`\nElevation: ${elevation}m asl`,
	`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
);

const current = response.current()!;
const hourly = response.hourly()!;
const daily = response.daily()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
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
		time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
			(_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
		),
		temperature_2m: hourly.variables(0)!.valuesArray(),
		relative_humidity_2m: hourly.variables(1)!.valuesArray(),
		precipitation: hourly.variables(2)!.valuesArray(),
		wind_speed_180m: hourly.variables(3)!.valuesArray(),
		weather_code: hourly.variables(4)!.valuesArray(),
	},
	daily: {
		time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
			(_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
		),
		temperature_2m_max: daily.variables(0)!.valuesArray(),
		temperature_2m_min: daily.variables(1)!.valuesArray(),
		weather_code: daily.variables(2)!.valuesArray(),
	},
};

// 'weatherData' now contains a simple structure with arrays with datetime and weather data
console.log(
	`\nCurrent time: ${weatherData.current.time}`,
	`\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
	`\nCurrent relative_humidity_2m: ${weatherData.current.relative_humidity_2m}`,
	`\nCurrent wind_speed_10m: ${weatherData.current.wind_speed_10m}`,
	`\nCurrent precipitation: ${weatherData.current.precipitation}`,
	`\nCurrent is_day: ${weatherData.current.is_day}`,
);
console.log("\nHourly data", weatherData.hourly)
console.log("\nDaily data", weatherData.daily)
