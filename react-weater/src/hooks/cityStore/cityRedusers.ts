import { CityState } from "../../types/CityTypes";

const initialState: CityState = {
  cityForecast: JSON.parse(localStorage.getItem("cityForecast") || "[]"),
};

export const cityReduser = (
  state = initialState,
  action: { type: string; payload?: string }
): CityState => {
  switch (action.type) {
    case "ADD":
      const newCityForecast = [...state.cityForecast, { city: action.payload || "" }];
      localStorage.setItem("cityForecast", JSON.stringify(newCityForecast));
      return {
        ...state,
        cityForecast: newCityForecast,
      };

    case "DELETE":
      if (!action.payload) {
        return state;
      }
      const filteredCities = state.cityForecast.filter(
        (city) => city.city !== action.payload
      );
      localStorage.setItem("cityForecast", JSON.stringify(filteredCities));
      return {
        ...state,
        cityForecast: filteredCities,
      };

    default:
      return state;
  }
};
