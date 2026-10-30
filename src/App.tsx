import { FormEvent, KeyboardEvent, useState } from "react";
import { fetchWeatherByCity } from "./services/weatherService";
import type { WeatherData } from "./types/weather";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

function App() {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isResultVisible, setIsResultVisible] = useState(false);

  const setPageBackground = (isSuccess: boolean) => {
    document.body.style.background = isSuccess ? "#87ceeb" : "#ebab87";
  };

  const handleSearch = async (event?: FormEvent) => {
    event?.preventDefault();

    const cityName = city.trim();

    if (!cityName) {
      setError("Digite o nome da cidade.");
      setWeather(null);
      setIsResultVisible(false);
      setPageBackground(false);
      return;
    }

    if (!apiKey) {
      setError(
        "API key ausente. Defina VITE_OPENWEATHER_API_KEY no arquivo .env",
      );
      setWeather(null);
      setIsResultVisible(false);
      setPageBackground(false);
      return;
    }

    try {
      const data = await fetchWeatherByCity(cityName, apiKey);
      setWeather(data);
      setError("");
      setIsResultVisible(true);
      setPageBackground(true);
    } catch (err) {
      console.error(err);
      setError("Cidade não encontrada. Tente novamente.");
      setWeather(null);
      setIsResultVisible(false);
      setPageBackground(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <main className="page-shell">
      <img
        id="weather-bg-img"
        className={`weather-bg-img ${isResultVisible ? "visible" : ""}`}
        alt={weather?.description ?? ""}
        src={weather?.background ?? "/images/clear.jpg"}
      />

      <div className="app-frame">
        <section className="search-container weather-card" id="weather-card">
          <header className="search-header">
            <h1 id="search-title" className={isResultVisible ? "hidden" : ""}>
              Clima Tempo
            </h1>
            <h2
              id="search-title-second"
              className={isResultVisible ? "visible" : ""}
            >
              Digite o nome da cidade
            </h2>
          </header>

          <p className="search-paragraphy sp-top">
            Veja as condições atuais do tempo na cidade.
          </p>

          <form className="search-box" onSubmit={handleSearch} noValidate>
            <label htmlFor="city" className="sr-only">
              Nome da cidade
            </label>
            <input
              type="search"
              id="city"
              name="city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite o nome da cidade"
              aria-label="Digite o nome da cidade"
              autoComplete="off"
            />
            <button type="submit" id="btn-pesquisar">
              Pesquisar
            </button>
          </form>

          <p className="search-paragraphy sp-bottom">
            Dados meteorológicos atualizados para se manter informado sobre o
            clima.
          </p>

          <div
            className={`weather-container ${isResultVisible ? "visible" : ""}`}
            id="weather-container"
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
        </section>

        {error && (
          <p id="erro-info" role="alert">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}

export default App;
