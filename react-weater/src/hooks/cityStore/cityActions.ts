export const addCity = (city: string) => ({
    type: "ADD",
    payload: city,
  });
  
  export const deleteCity = (city: string) => ({
    type: "DELETE",
    payload: city,
  });