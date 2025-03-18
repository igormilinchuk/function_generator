require('dotenv').config();
const { DateTime } = require('luxon');


async function* fetchWeatherGenerator(city, apiKey, startDateTime, stopDateTime = null) {
    let currentDateTime = startDateTime;
    const timeZone = 'Europe/Kiev'; 

    while (true) {
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

            const weatherData = data.list.find(item => item.dt_txt === currentDateTime);
            if (!weatherData) {
                throw new Error(`Даних для ${currentDateTime} немає.`);
            }

            yield weatherData;

            currentDateTime = DateTime.fromFormat(currentDateTime, 'yyyy-MM-dd HH:mm:ss', { zone: timeZone })
                .plus({ hours: 3 })
                .toFormat('yyyy-MM-dd HH:mm:ss');

            if (stopDateTime && currentDateTime >= stopDateTime) {
                console.log(`Призупинено на ${currentDateTime}.`);
                return;
            }

        } catch (error) {
            console.error(error.message);
            return;
        }
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
    //     console.log(`Прогноз на ${weatherData.dt_txt}:`, weatherData.weather[0].description);
    //     console.log('Температура:', weatherData.main.temp + '°C');
    // }
})();
