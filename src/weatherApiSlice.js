import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeather = createAsyncThunk(
  "weatherApi/fetchWeather",
  async () => {
    console.log("fetchWeather is called");
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=31.5&lon=34.4&appid=41b10df90f7f3516453d120178cd670d",
      // {
      //   cancelToken: new axios.CancelToken((cancel) => {
      //     cancelAxios = cancel;
      //   }),
      // },
    );

    const responsetemp = Math.round(response.data.main.temp - 273.15);
    const min = Math.round(response.data.main.temp_min - 273.15);
    const max = Math.round(response.data.main.temp_max - 273.15);
    const description = response.data.weather[0].description;
    const icon = response.data.weather[0].icon;

    console.log("respons", response);

    // console.log(min);
    // console.log(max);
    // console.log(description);
    // console.log(min);
    // setTemp({
    //   number: responsetemp,
    //   description: description,
    //   min: min,
    //   max: max,
    //   icon: ,
    // });

    return {
      number: responsetemp,
      description,
      min,
      max,
      icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
    };
  },
);

const weatherApiSlice = createSlice({
  name: "weatherApi",
  initialState: {
    result: "empty",
    weatherData: {},
    isLoading: false,
  },
  reducers: {
    changeResult: (currentstate, action) => {
      currentstate.result = "changed";
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        console.log("------------------------------");
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        console.log("fetchWeather.fulfilled is called");
        state.weatherData = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        console.log("fetchWeather.rejected is called");
        state.isLoading = false;
      });
  },
});

export const { changeResult } = weatherApiSlice.actions;
export default weatherApiSlice.reducer;
