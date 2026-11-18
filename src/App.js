import { Button, Container, Typography } from "@mui/material";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import CloudIcon from "@mui/icons-material/Cloud";
import { useTranslation } from "react-i18next";
import axios from "axios";
import moment from "moment";
import "moment/min/locales"; // Import Arabic locale for moment.js
import CircularProgress from "@mui/material/CircularProgress";

import { useSelector, useDispatch } from "react-redux";
import { changeResult } from "./weatherApiSlice";
import { fetchWeather } from "./weatherApiSlice";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM", "sans-serif"],
  },
});
// let cancelAxios = null;
function App() {
  const dispatch = useDispatch();


  const isLoading = useSelector((state) => {
    console.log("------------------------------------");
    console.log(state);
    return state.weather.isLoading;
  });

  const temp = useSelector((state) => {
    console.log("------------------------------------");
    console.log(state);
    return state.weather.weatherData;
  });

  const { t, i18n } = useTranslation();
  const [dateandtime, setDateAndTime] = useState("");


  const [language, setLanguage] = useState("ar");
  const direction = language === "ar" ? "rtl" : "ltr";

  function handleLangclike() {
    if (language === "en") {
      setLanguage("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setLanguage("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    // i18n.changeLanguage(language);
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }

  useEffect(() => {
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    // const controller = new AbortController();

    return () => {
      console.log("Cleaning up: canceling Axios request");
      // cancelAxios();
    };
  }, []);

  useEffect(() => {
    // dispatch(changeResult());
    console.log("Dispatching fetchWeather action");
    dispatch(fetchWeather());
    i18n.changeLanguage(language);
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <div className="weather-wrapper">
            <div className="weather-card" dir={direction}>
              <div>
                {/* City and Date */}
                <div className="weather-header" dir={direction}>
                  <Typography variant="h2" className="city-name">
                    {t("Gaza Strip")}
                  </Typography>

                  <Typography variant="h5" className="weather-date">
                    {dateandtime}
                  </Typography>
                </div>

                <hr />

                {/* Weather Information */}
                <div>
                  <div className="weather-content">
                    {/* Temperature and Description */}
                    <div
                      className="weather-info"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h1" className="temperature">
                        {temp.number}
                      </Typography>
                      {isLoading ? (
                        <CircularProgress
                          aria-label="Loading…"
                          style={{ color: "wheat" }}
                        />
                      ) : (
                        ""
                      )}

                      <img src={temp.icon} alt={temp.description} />

                      <Typography variant="h6" className="description">
                        {t(temp.description)}
                      </Typography>

                      {/* Min and Max Temperature */}
                      <div className="temperature-range">
                        <h5>
                          {t("Minimum")}: {temp.min}
                        </h5>
                        <h5 className="separator">|</h5>
                        <h5>
                          {t("Maximum")}: {temp.max}
                        </h5>
                      </div>
                    </div>

                    {/* Weather Icon */}
                    <div className="weather-icon">
                      <CloudIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Language Button */}
            <div className="language-button" dir={direction}>
              <Button variant="text" onClick={handleLangclike}>
                {language === "en" ? "العربية" : "انجليزي"}
              </Button>
            </div>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
