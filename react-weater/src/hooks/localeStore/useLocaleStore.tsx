// import { useState, useEffect } from "react";

// export const useLocalStorage = (key: string) => {
//     const [storedValue, setStoredValue] = useState(localStorage.getItem(key));

//     useEffect(() => {
//         const handleStorageChange = () => {
//             setStoredValue(localStorage.getItem(key));
//         };

//         window.addEventListener("cityForecastChange", handleStorageChange);

//         return () => {
//             window.removeEventListener("cityForecastChange", handleStorageChange);
//         };
//     }, [key]);

//     const setValue = (value: string) => {
//         localStorage.setItem(key, value);
//         window.dispatchEvent(new Event("cityForecastChange"));
//     };

//     return [storedValue, setValue] as const;
// };
