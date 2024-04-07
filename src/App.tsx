import styles from "./App.module.scss";
import CityProvider from "./Store/cityContext";
import CityForm from "./components/CityForm/CityForm";
import Weather from "./components/Weather/Weather";

function App() {
  return (
    <div className={styles.app}>
      <CityProvider>
        <CityForm />
        <Weather />
      </CityProvider>
    </div>
  );
}

export default App;
