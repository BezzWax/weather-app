import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { WeatherData } from "../types/WeatherDataTypes";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Loader } from "../components/Loader";
import { Chart } from "../components/Chart";

export const CityForecastInfo = () => {
    const [city, setCity] = useState<WeatherData | null>(null);
    const { pathname } = useLocation();
    const cityName = pathname.split('/')[1];
    const navigate = useNavigate();

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

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <div className="all-height">
            {city ? (
                (() => {
                    return (
                        <Container className="forecast-container">
                            <Row>
                                <Col style={{alignContent: 'center'}}>
                                    <div style={{textAlign: 'center'}}>
                                        <h1>{city.name}, {city.sys.country}</h1>
                                        <p>Temperature: {city.main.temp}°C (Feels like: {city.main.feels_like}°C)</p>
                                        <p>Humidity: {city.main.humidity}% | Pressure: {city.main.pressure} hPa</p>
                                    </div>
                                    
                                    <div className="weather-badge-container">
                                        <div className="weather-badge">
                                            <img
                                                className="weather-icon"
                                                src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                                                alt={city.weather[0].description}
                                            />
                                            <label>{city.weather[0].description}</label>
                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="chart-container">
                                        <h3>Forecast Chart</h3>
                                        <Chart lat={city.coord.lat} lon={city.coord.lon} name={city.name} />
                                    </div>
                                </Col>
                            </Row>
                            <Button className="btn-color mt-3" onClick={handleBack}>Back</Button>
                        </Container>
                    );
                })()
            ) : (
                <Loader />
            )}
        </div>
    );
    
};
