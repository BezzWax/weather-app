import { Button, Col, Row, Stack } from "react-bootstrap";
import '../assets/styles/CityAdd.scss';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCity } from "../hooks/cityStore/cityActions";

export const CityAdd = () => {
  const [newCity, setNewCity] = useState("");
  const dispatch = useDispatch();

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCity(event.target.value);
  };

  const handleAddCity = () => {
    if (newCity) {
      dispatch(addCity(newCity));
      setNewCity("");
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
          />
          <Button onClick={handleAddCity}>Add</Button>
        </Stack>
      </Col>
    </Row>
  );
};
