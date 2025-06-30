async function getWeather() {
          const city = document.getElementById("city").value;
          const apiKey = "SUA_API_KEY_AQUI";
          const lang = "pt_br";
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=${lang}&units=metric`;

          try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === 200) {
              const weather = data.weather[0].main.toLowerCase();
              const temp = data.main.temp;
              const rain = data.rain ? data.rain["1h"] : 0;
              const rainPercentage = rain > 0 ? Math.min(rain * 10, 100) : 0;
              const humidity = data.main.humidity;
              const wind = data.wind.speed;
              const description = data.weather[0].description;
              const icon = data.weather[0].icon;
              const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

              document.getElementById("weather-container").style =
                "display:block";

              document.getElementById("weather-bg-img").style =
                "display: block";

              document.getElementById("search-title").style = "display:none";

              document.getElementById("search-title-second").style =
                "display:block";

              document.getElementById("erro-info").style = "display:none";

              document
                .querySelectorAll(".search-paragraphy")
                .forEach((item) => (item.style.display = "none"));
              document.getElementById("temp-info").textContent = `${Math.round(
                temp
              )} °C`;

              document.getElementById("rain-info").textContent = `${rain}%`;

              document.getElementById(
                "humidity-info"
              ).textContent = `${humidity}%`;

              document.getElementById("wind-info").textContent = `${Math.round(
                wind
              )} km/h`;

              document.getElementById(
                "description-info"
              ).textContent = `${description}`;

              document.getElementById("icon-info").src = iconUrl;

              document
                .querySelectorAll(".status-info")
                .forEach((item) => (item.style.display = "block"));

              updateWeatherImage(weather);
            } else {
              document.getElementById("erro-info").textContent =
                "Cidade não encontrada. Tente novamente.";

              document.getElementById("erro-info").style = "display:block";

              document.body.style.background = "#ebab87";

              document.getElementById("weather-bg-img").style = "display: none";

              document.getElementById("icon-info").src =
                "images/error-icon.png";

              document
                .querySelectorAll(".status-info")
                .forEach((item) => (item.style.display = "none"));

              document.querySelector(".search-container").style =
                "background:#37474fcc;";
            }
          } catch (error) {
            document.getElementById("erro-info").style = "display:block";
            console.error(error);
            document.getElementById("erro-info").textContent =
              "Erro ao buscar dados meteorológicos. Tente novamente mais tarde";
          }
        }

        function updateWeatherImage(weather) {
          const img = document.getElementById("weather-bg-img");

          switch (weather) {
            case "clear":
              img.src = "images/clear.jpg";
              break;
            case "clouds":
              img.src = "images/clouds.jpg";
              break;
            case "rain":
            case "drizzle":
              img.src = "images/rain.jpg";
              break;
            case "thunderstorm":
              img.src = "images/thunder.jpg";
              break;
            case "snow":
              img.src = "images/snow.jpg";
              break;
            default:
              img.src = "images/clear.jpg";
          }

          img.alt = weather;
        }

        document
          .getElementById("city")
          .addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
              document.getElementById("btn-pesquisar").click();
            }
          });