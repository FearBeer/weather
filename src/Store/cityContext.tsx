import { createContext, useState } from "react";

interface ICityContext {
  city: {
    name: string;
    country: string;
  };

  setCity: React.Dispatch<
    React.SetStateAction<{
      name: string;
      country: string;
    }>
  >;
}

const defaultCity = {
  name: "Рязань",
  country: "RU",
};

export const CityContext = createContext<ICityContext | null>(null);
const CityProvider = ({ children }: { children: React.ReactNode }) => {
  const [city, setCity] = useState(defaultCity);
  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
};

export default CityProvider;
