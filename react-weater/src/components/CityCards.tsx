import { useEffect, useState } from 'react';
import '../assets/styles/CityCard.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Loader } from './Loader';
import { useDispatch } from 'react-redux';
import { deleteCity } from '../hooks/cityStore/cityActions';

export const CityCards = () => {
    const [weatherData, setWeatherData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchWeatherDataForCity = async (city: string) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY || "2ca6774e04c3e69ed3c5702f52b3da53"}&units=metric`
            );
            setWeatherData(prevData =>
                prevData.map(data =>
                    data.city === city ? { ...data, weather: response.data } : data
                )
            );
        } catch (error) {
            console.error("Error fetching weather data: ", error);
        }
    };

    const fetchWeatherData = async () => {
        const savedCities = localStorage.getItem("cityForecast");
        const formattedCities = savedCities ? JSON.parse(savedCities) : [];

        if (formattedCities.length === 0) {
            setLoading(false);
            return;
        }

        try {
            const cityWeatherPromises = formattedCities.map(async ({ city }: { city: string }) => {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY || "2ca6774e04c3e69ed3c5702f52b3da53"}&units=metric`
                );
                return { city, weather: response.data };
            });
            const weatherData = await Promise.all(cityWeatherPromises);
            setWeatherData(weatherData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching weather data: ", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const handleClick = (city: string) => {
        fetchWeatherDataForCity(city);
    };

    const handleDeleteCity = (city: string, e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(deleteCity(city));
        fetchWeatherData();
    };
    

    return (
        <Container>
            <Row>
                {loading ? (
                    <Loader />
                ) : (
                    weatherData.map(({ city, weather }) => (
                        <Col lg={3} md={4} key={city}>
                            <div className="city-card" onClick={() => navigate(`/${city.toLowerCase()}`)}>
                                <div className="card-title">{city}</div>
                                <div className="card-text">
                                    {weather?.main?.temp}°C - {weather?.weather[0]?.description}
                                </div>
                                <img
                                    className="weather-icon"
                                    src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}.png`}
                                    alt={weather?.weather[0]?.description}
                                />

                                <Row>
                                    <Col>
                                        <Button
                                            className='my-1 btn-upd'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleClick(city);
                                            }}
                                        >
                                            Update
                                        </Button>
                                    </Col>
                                    <Col>
                                    <Button 
                                        className='my-1'
                                        variant="danger"
                                        onClick={(e) => handleDeleteCity(city, e)}
                                    >
                                        Delete
                                    </Button>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
};
