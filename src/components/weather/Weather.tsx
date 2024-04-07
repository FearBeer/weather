import { useContext, useEffect, useState } from "react";
import { getCities } from "../../api/getCities";
import { getWeather } from "../../api/getWeather";
import styles from "./Weather.module.scss";
import { CityContext } from "../../Store/cityContext";
import WeatherCard from "../WeatherCard/WeatherCard";

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
        // запрашиваем города
        const cities = await getCities(city, countryCode);
        if (cities.length > 0) {
          // здесь можно сделать уточнение города
          // но на данный момент берём просто 1й из пришедших городов
          // если я правильно понял, то это наиболее популярный из
          // всех

          // получение координат нужного города
          const lat = cities[0].lat;
          const lon = cities[0].lon;
          try {
            // получаем инфу по городу
            const weather = await getWeather(lat, lon);
            setWeather(weather.list);
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
  let fiveDaysWeather: any[] = [];
  if (!loading) {
    const map = new Map();
    weather.forEach((element: { dt_txt: string }) => {
      const day = element.dt_txt.split(" ");
      day.pop();
      if (map.has(day[0])) {
        map.get(day[0]).push(element);
      } else {
        if (map.size < 5) {
          map.set(day[0], [element]);
        }
      }
    });
    // получаем массив из двух элементов
    // 1й: дата, 2й - объект из данных о температуре
    fiveDaysWeather = Array.from(map);
  }

  return (
    <div className={styles.wrapper}>
      {loading === true ? (
        (isEmptyCities && (
          <div>
            "Нет такого города в нашей базе... проверьте название страны и
            города"
          </div>
        )) ||
        "loading"
      ) : (
        <>
          <WeatherCard data={fiveDaysWeather[0]} isFirst={true} />
          <WeatherCard data={fiveDaysWeather[1]} isFirst={false} />
          <WeatherCard data={fiveDaysWeather[2]} isFirst={false} />
          <WeatherCard data={fiveDaysWeather[3]} isFirst={false} />
          <WeatherCard data={fiveDaysWeather[4]} isFirst={false} />
        </>
      )}
    </div>
  );
}
