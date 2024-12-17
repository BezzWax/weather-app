export interface WeatherData {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
    };
    coord: {
        lon: number;
        lat: number;
    };
    weather: [
        {
            description: string;
            icon: string;
        }
    ];
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
}


export type CityState = WeatherData | null;


// {
//     "data": {
//         "coord": {
//             "lon": 26.2274,
//             "lat": 50.6231
//         },
//         "weather": [
//             {
//                 "id": 804,
//                 "main": "Clouds",
//                 "description": "overcast clouds",
//                 "icon": "04d"
//             }
//         ],
//         "base": "stations",
//         "main": {
//             "temp": 6.15,
//             "feels_like": 0.37,
//             "temp_min": 6.15,
//             "temp_max": 6.15,
//             "pressure": 1008,
//             "humidity": 93,
//             "sea_level": 1008,
//             "grnd_level": 983
//         },
//         "visibility": 10000,
//         "wind": {
//             "speed": 13.31,
//             "deg": 272,
//             "gust": 24.52
//         },
//         "clouds": {
//             "all": 100
//         },
//         "dt": 1734355499,
//         "sys": {
//             "type": 2,
//             "id": 2046291,
//             "country": "UA",
//             "sunrise": 1734329463,
//             "sunset": 1734358243
//         },
//         "timezone": 7200,
//         "id": 695594,
//         "name": "Rivne",
//         "cod": 200
//     },
//     "status": 200,
//     "statusText": "OK",
//     "headers": {
//         "content-length": "517",
//         "content-type": "application/json; charset=utf-8"
//     },
//     "config": {
//         "transitional": {
//             "silentJSONParsing": true,
//             "forcedJSONParsing": true,
//             "clarifyTimeoutError": false
//         },
//         "adapter": [
//             "xhr",
//             "http",
//             "fetch"
//         ],
//         "transformRequest": [
//             null
//         ],
//         "transformResponse": [
//             null
//         ],
//         "timeout": 0,
//         "xsrfCookieName": "XSRF-TOKEN",
//         "xsrfHeaderName": "X-XSRF-TOKEN",
//         "maxContentLength": -1,
//         "maxBodyLength": -1,
//         "env": {},
//         "headers": {
//             "Accept": "application/json, text/plain, */*"
//         },
//         "method": "get",
//         "url": "https://api.openweathermap.org/data/2.5/weather?q=rivne&appid=2ca6774e04c3e69ed3c5702f52b3da53&units=metric"
//     },
//     "request": {}
// }
