import { Button, Col, Row, Stack } from "react-bootstrap";
import '../assets/styles/CityAdd.scss';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCity } from "../hooks/cityStore/cityActions";
import { Alert } from "../components/Alert";

export const CityAdd = () => {
  const [newCity, setNewCity] = useState("");
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  
  const cities = useSelector((state: any) => state.city.cityForecast);

  const handleClose = () => setShowModal(false);

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCity(event.target.value);
  };

  const handleAddCity = () => {
    if (!newCity.trim()) return;

    const cityExists = cities.some((city: { city: string }) => city.city.toLowerCase() === newCity.toLowerCase());

    if (cityExists) {
      setShowModal(true);
      return;
    }

    dispatch(addCity(newCity.trim()));
    setNewCity("");
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
          <Button 
            className="btn-color" 
            onClick={handleAddCity}
          >
              Add
            </Button>
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
