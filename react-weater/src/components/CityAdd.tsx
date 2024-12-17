import { Button, Col, Row, Stack } from "react-bootstrap";
import '../assets/styles/CityAdd.scss';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCity } from "../hooks/cityStore/cityActions";
import { Alert } from "../components/Alert";

export const CityAdd = () => {
  const [newCity, setNewCity] = useState("");
  const [cities, setCities] = useState<{ city: string }[]>([]);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  useEffect(() => {
    const savedCities = localStorage.getItem('cityForecast');
    
    if (savedCities) {
      const parsedCities = JSON.parse(savedCities);
      setCities(parsedCities);
    }
  }, []);

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCity(event.target.value);
  };

  const handleAddCity = () => {
    const savedCities = localStorage.getItem('cityForecast');
    let updatedCities = savedCities ? JSON.parse(savedCities) : [];

    if (updatedCities.some((city: { city: string; }) => city.city.toLowerCase() === newCity.toLowerCase())) {
      setShowModal(true);
      return;
    }

    if (newCity) {
      dispatch(addCity(newCity));

      updatedCities = [...updatedCities, { city: newCity }];
      setCities(updatedCities);

      localStorage.setItem('cityForecast', JSON.stringify(updatedCities));

      setNewCity("");

      window.location.reload();
    }
  };

  return (
    <Row className="justify-content-center align-items-center">
      <Col lg={10} className="text-center py-5">
        <Stack direction="horizontal" gap={3} className="justify-content-center">
          <input
            className="city-add-input"
            value={newCity}
            onChange={handleCityChange}
            placeholder="Enter city name"
          />
          <Button onClick={handleAddCity}>Add</Button>
        </Stack>
      </Col>
      <Alert
        message="City already added"
        showAlert={showModal}
        onClose={handleClose}
      />
    </Row>
  );
};
