export async function getWeather(lat: string, lon: string) {
  console.log("getting weather");


  try {
    const responseWether = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${KEY}&lang=ru&units=metric`
    );
    const weather = await responseWether.json();
    return weather;
  } catch (error) {
    console.log(error);
    return error;
  }
}
