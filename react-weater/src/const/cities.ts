export const cityForecast = [
    { city: "Kyiv" },
    { city: "Kharkiv" },
    { city: "Odesa" },
    { city: "Dnipro" },
    { city: "Donetsk" },
    { city: "Zaporizhzhia" },
    { city: "Lviv" },
    { city: "Kryvyi Rih" },
    { city: "Mykolaiv" },
    { city: "Mariupol" }
];

localStorage.setItem("cityForecast", JSON.stringify(cityForecast));
