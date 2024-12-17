import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { WeatherData } from "../types/WeatherDataTypes";
import { Col, Container, Row } from "react-bootstrap";
import { Loader } from "../components/Loader";
import { Chart } from "../components/Chart";

export const CityForecastInfo = () => {
    const [city, setCity] = useState<WeatherData | null>(null);
    const { pathname } = useLocation();
    const cityName = pathname.split('/')[1];

    const fetchWeatherDataForCity = async (cityName: string) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.API_KEY || "2ca6774e04c3e69ed3c5702f52b3da53"}&units=metric`
            );
            setCity(response.data);
        } catch (error) {
            console.error("Error fetching weather data: ", error);
        }
    };

    useEffect(() => {
        if (cityName) {
            fetchWeatherDataForCity(cityName);
        }
    }, [cityName]);



    return (
        <div className="all-height">
            {city ? (
                (() => {
                    return (
                        <Row>
                            <Col>
                                <Container className="text-center">
                                    <h1>{city.name}, {city.sys.country}</h1>
                                    <p>Temperature: {city.main.temp}°C (Feels like: {city.main.feels_like}°C)</p>
                                    <p>Humidity: {city.main.humidity}% | Pressure: {city.main.pressure} hPa</p>
                                    <p>Wind: {city.wind.speed} m/s, {city.wind.deg}°</p>
                                    <p>Cloudiness: {city.clouds.all}%</p>
    
                                    <div className="weather-badge-container">
                                        <div className="weather-badge">
                                            <img
                                                width={50}
                                                height={50}
                                                className="weather-icon"
                                                src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                                                alt={city.weather[0].description}
                                            />
                                            <label>{city.weather[0].description}</label>
                                        </div>
                                        
                                    </div>
    
                                    <p>Sunrise: {new Date(city.sys.sunrise * 1000).toLocaleTimeString()}</p>
                                    <p>Sunset: {new Date(city.sys.sunset * 1000).toLocaleTimeString()}</p>
                                </Container>
                            </Col>
    
                            <Col className="text-center">
                                <h3>Weather Details</h3>
                                <p>Coordinates: Latitude {city.coord.lat}, Longitude {city.coord.lon}</p>

                                <Chart lat={city.coord.lat} lon={city.coord.lon} name={city.name} />
                            </Col>
                        </Row>
                    );
                })()
            ) : (
                <Loader />
            )}
        </div>
    );
    
};
