export async function getCities(city: string, country: string) {
  console.log("getting cities");
  const KEY = "8ac4a344ea205edc13626598aeafba7b";

  try {
    const responseCities = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=5&appid=${KEY}`
    );
    const cities = await responseCities.json();
    return cities;
  } catch (error) {
    console.log(error);
    return error;
  }
}
