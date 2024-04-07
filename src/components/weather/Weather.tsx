import { useContext, useEffect, useState } from "react";
import { getCities } from "../../api/getCities";
import { getWeather } from "../../api/getWeather";
import styles from "./Weather.module.scss";
import { CityContext } from "../../Store/cityContext";

export default function Weather() {
  const [weather, setWeather] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [isEmptyCities, setIsEmptyCities] = useState(false);
  const context = useContext(CityContext);
  useEffect(() => {
    const city = context?.city.name || "Рязань";
    const countryCode = context?.city.country || "RU";

    (async () => {
      setLoading(true);
      try {
        const cities = await getCities(city, countryCode);
        console.log(cities);
        if (cities.length > 0) {
          const lat = cities[0].lat;
          const lon = cities[0].lon;
          try {
            const weather = await getWeather(lat, lon);
            console.log(weather);

            setWeather(weather);
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        } else {
          setIsEmptyCities(true);
          console.log(
            "Нет такого города в нашей базе... проверьте название страны и города"
          );
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [context?.city.country, context?.city.name]);

  return (
    <div>
      {loading === true
        ? (isEmptyCities && (
            <div>
              "Нет такого города в нашей базе... проверьте название страны и
              города"
            </div>
          )) ||
          "loading"
        : weather?.list.map((item: any) => {
            const todayFull = new Date(item.dt * 1000);
            return (
              <div key={item.dt} className={styles.card}>
                <p className={styles.date}>{todayFull.toString()}</p>
                <p className={styles.temperature}>
                  {Math.round(item.main.temp)}
                </p>
                <p className={styles.type}>{item.weather[0].description}</p>
                <img
                  className={styles.icon}
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="icon"
                />
              </div>
            );
          })}
    </div>
  );
}
