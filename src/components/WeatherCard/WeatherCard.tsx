import styles from "./WeatherCard.module.scss";

export default function WeatherCard({
  data,
  isFirst,
}: {
  data: any;
  isFirst: boolean;
}) {
  //получаем строку из температуры для вывода
  function temperatureToString(temperatureValue: number) {
    let temperature = Math.round(temperatureValue);
    if (temperature > 0) {
      return `+${temperature} ℃`;
    } else {
      return `${temperature} ℃`;
    }
  }
  // дата прогноза
  const date = data[0];
  // данные о погоде на текущий день
  const weatherData = data[1];
  const forecastWeather =
    weatherData.length >= 4
      ? weatherData[4]
      : weatherData[weatherData.length - 1];
  // берём погоду по полдню или последнее доступное
  let forecastWeatherTemp = forecastWeather.main.temp;

  let description = forecastWeather.weather[0].description;
  let iconSrc = `https://openweathermap.org/img/wn/${forecastWeather.weather[0].icon}.png`;

  if (isFirst) {
    forecastWeatherTemp = weatherData[0].main.temp;
    iconSrc = `https://openweathermap.org/img/wn/${weatherData[0].weather[0].icon}.png`;
    description = weatherData[0].weather[0].description;
  }

  const temperature = temperatureToString(forecastWeatherTemp);

  return (
    <div className={styles.card}>
      <p className={styles.date}>{date}</p>
      <p className={styles.temperature}>{temperature}</p>
      <p className={styles.type}>{description}</p>
      <img className={styles.icon} src={iconSrc} alt="icon" />
      <div className={styles.hours}>
        {weatherData.map((el: any) => {
          //получение часов из данных о погоде
          const hour = el.dt_txt.split(" ").pop().split(":").shift();
          const temperature = temperatureToString(el.main.temp);
          return (
            <div key={el.dt} className={styles.widget}>
              <span>{hour}:00</span>
              <span>{temperature}</span>
              <img
                className={styles.icon}
                src={`https://openweathermap.org/img/wn/${el.weather[0].icon}.png`}
                alt="icon"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
