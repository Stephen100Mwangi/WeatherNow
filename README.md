# Weather Now
This is a Next.js application that provides real-time weather data for locations worldwide using the [Open-Meteo API](https://open-meteo.com/). The app detects your location automatically and displays current conditions, forecasts, and more.

![Weather Now](WeatherNow.png)

## Features

- **Search** for weather by location with debounced input
- **Current weather**: temperature, weather icon, and location details
- **Additional metrics**: "feels like" temperature, humidity, wind speed, precipitation
- **7-day forecast**: daily high/low temperatures and weather icons
- **Hourly forecast**: temperature changes throughout the day
- **Day selector**: switch between days in the hourly forecast
- **Units toggle**: switch between Imperial and Metric units (Celsius/Fahrenheit, km/h/mph, mm)
- **Responsive design**: optimal layout for all devices
- **Accessible UI**: hover and focus states for all interactive elements

## Requirements

1. Search for weather information by entering a location in the search bar
2. View current weather conditions, including temperature, and location details
3. See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
4. Browse a 7-day weather forecast with daily high/low temperatures and weather icons
5. View an hourly forecast showing temperature changes throughout the day
6. Switch between different days of the week using the day selector in the hourly forecast section
7. Toggle between Imperial and Metric measurement units via the units dropdown
8. Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters) via the units dropdown
9. View the optimal layout for the interface depending on their device's screen size
10. See hover and focus states for all interactive elements on the page

## Ideas to Extend

- Geolocation detection to show weather for your current location on first visit
- Favorites/saved locations system
- Compare weather for multiple locations side-by-side
- Display UV index, visibility, and air pressure
- Show sunrise/sunset times with visual indicators
- Animated weather backgrounds based on current conditions
- Voice search functionality
- Dark/light mode themes that adapt to the time of day
- Progressive Web App (PWA) support for mobile installation

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## License

MIT
