import { FormEvent, KeyboardEvent, useState } from "react";
import { fetchWeatherByCity } from "./services/weatherService";
import type { WeatherData } from "./types/weather";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

function App() {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isResultVisible, setIsResultVisible] = useState(false);

  const handleSearch = async (event?: FormEvent) => {
    event?.preventDefault();

    if (!city.trim()) {
      setError("Digite o nome da cidade.");
      setWeather(null);
      setIsResultVisible(false);
      document.body.style.background = "#ebab87";
      return;
    }

    if (!apiKey) {
      setError(
        "API key ausente. Defina VITE_OPENWEATHER_API_KEY no arquivo .env",
      );
      setWeather(null);
      setIsResultVisible(false);
      document.body.style.background = "#ebab87";
      return;
    }

    try {
      const data = await fetchWeatherByCity(city, apiKey);
      setWeather(data);
      setError("");
      setIsResultVisible(true);
      document.body.style.background = "#87ceeb";
    } catch (err) {
      console.error(err);
      setError("Cidade não encontrada. Tente novamente.");
      setWeather(null);
      setIsResultVisible(false);
      document.body.style.background = "#ebab87";
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container">
      <img
        id="weather-bg-img"
        className="weather-bg-img"
        alt={weather?.description ?? ""}
        src={weather?.background ?? "/images/clear.jpg"}
        style={{ display: isResultVisible ? "block" : "none" }}
      />

      <div className="search-container weather-card" id="weather-card">
        <h1
          id="search-title"
          style={{ display: isResultVisible ? "none" : "block" }}
        >
          Clima Tempo
        </h1>
        <h1
          id="search-title-second"
          style={{ display: isResultVisible ? "block" : "none" }}
        >
          Digite o nome da cidade
        </h1>

        <p className="search-paragraphy sp-top">
          Veja as condições atuais do tempo na <br />
          cidade.
        </p>

        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite o nome da cidade"
          />
          <button type="submit" id="btn-pesquisar">
            Pesquisar
          </button>
        </form>

        <p className="search-paragraphy sp-bottom">
          Dados meteorológicos atualizados para <br />
          se manter informado sobre o clima.
        </p>

        <div
          className="container weather-container"
          id="weather-container"
          style={{ display: isResultVisible ? "flex" : "none" }}
        >
          <div className="box-results-temp">
            <div className="clima-results-head">
              <div className="temp-result-box">
                <img
                  id="icon-info"
                  alt="Ícone do clima"
                  src={weather?.icon ?? ""}
                />
                <p id="temp-info" className="status-info">
                  {weather?.temp}
                </p>
              </div>
              <p id="description-info" className="status-info">
                {weather?.description}
              </p>
            </div>
          </div>

          <div className="results-bottom">
            <div className="results-text-bottom r-border-text">
              <p>Chuva</p>
              <p id="rain-info" className="status-info">
                {weather?.rain}
              </p>
            </div>
            <div className="results-text-bottom r-border-text">
              <p>Umidade</p>
              <p id="humidity-info" className="status-info">
                {weather?.humidity}
              </p>
            </div>
            <div className="results-text-bottom ml-1">
              <p>Vento</p>
              <p id="wind-info" className="status-info">
                {weather?.wind}
              </p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <p id="erro-info" style={{ display: "block" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default App;
