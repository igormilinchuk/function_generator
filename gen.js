require('dotenv').config();

async function* fetchWeatherGenerator(city, apiKey, startDateTime, stopDateTime = null) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.list) {
          throw new Error("Даних немає.");
      }

      const availableStartDate = data.list[0].dt_txt;
      const availableEndDate = data.list[data.list.length - 1].dt_txt;

      if (startDateTime < availableStartDate || startDateTime > availableEndDate) {
          throw new Error(`Даних для ${startDateTime} немає. Доступний прогноз з ${availableStartDate} по ${availableEndDate}.`);
      }

      const filteredData = data.list.filter(item => item.dt_txt > startDateTime);

      for (const weather of filteredData) {
          if (stopDateTime && weather.dt_txt >= stopDateTime) {
              console.log(`Призупинено на ${weather.dt_txt}. Викличте генератор з цієї дати для продовження.`);
              return weather.dt_txt; 
          }
          yield weather;
      }
  } catch (error) {
      console.error(error.message);
  }
}


const apiKey = process.env.OPENWEATHER_API_KEY 

let city = 'Kyiv';
let startDateTime = '2025-03-18 21:00:00'; 
let stopDateTime = '2025-03-20 00:00:00';  

let lastDateTime = startDateTime; 

(async () => {
    const generator = fetchWeatherGenerator(city, apiKey, lastDateTime, stopDateTime);

    for await (const weatherData of generator) {
        console.log(`Прогноз на ${weatherData.dt_txt}:`, weatherData.weather[0].description);
        console.log('Температура:', weatherData.main.temp + '°C');
        lastDateTime = weatherData.dt_txt;
    }

    console.log("Зупинилися на:", lastDateTime);

    // console.log("Продовжуємо вивід...");

    // const newGenerator = fetchWeatherGenerator(city, apiKey, lastDateTime);

    // for await (const weatherData of newGenerator) {
    //   console.log(`Прогноз на ${weatherData.dt_txt}:`, weatherData.weather[0].description);
    //   console.log('Температура:', weatherData.main.temp + '°C');
    // }
})();

