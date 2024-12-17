import { useEffect, useState } from 'react';
import '../assets/styles/CityCard.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import { Loader } from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCity } from '../hooks/cityStore/cityActions';

export const CityCards = () => {
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingCity, setUpdatingCity] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cities = useSelector((state: any) => state.city.cityForecast);

  const fetchWeatherData = async () => {
    setLoading(true);

    try {
      const cityWeatherPromises = cities.map(async ({ city }: { city: string }) => {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY || "2ca6774e04c3e69ed3c5702f52b3da53"}&units=metric`
        );
        return { city, weather: response.data };
      });
      const weatherData = await Promise.all(cityWeatherPromises);
      setWeatherData(weatherData);
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const updateCityWeather = async (city: string) => {
    setUpdatingCity(city);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY || "2ca6774e04c3e69ed3c5702f52b3da53"}&units=metric`
      );
      setWeatherData((prevData) =>
        prevData.map((item) =>
          item.city === city ? { city, weather: response.data } : item
        )
      );
    } catch (error) {
      console.error(`Error updating weather for ${city}: `, error);
    } finally {
      setUpdatingCity(null);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [cities]);

  const handleDeleteCity = (city: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteCity(city));
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

                <Stack direction='horizontal' className='justify-content-around'>
                    <Button
                        className='btn-color'
                        onClick={(e) => {
                            e.stopPropagation();
                            updateCityWeather(city);
                        }}
                        disabled={updatingCity === city}
                    >
                        Update
                  </Button>

                    <Button
                    className='my-1'
                    variant="danger"
                    onClick={(e) => handleDeleteCity(city, e)}
                    >
                    Delete
                    </Button>
                </Stack>

                
              </div>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};
