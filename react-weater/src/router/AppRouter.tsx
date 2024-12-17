import { Route, Routes } from "react-router-dom"
import { ForecastPage } from "../pages/ForecastPage"
import { CityForecastInfo } from "../pages/CityForecastInfo"


export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<ForecastPage />} />
            <Route path='/:id' element={<CityForecastInfo />} />
        </Routes>
    )
}