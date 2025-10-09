import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Cidades from "../pages/Cidades";
import Paises from "../pages/Paises";
import Continentes from "../pages/Continentes";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Routes>
                <Route path="/cidades" element={<Cidades />} />
            </Routes>
            <Routes>
                <Route path="/paises" element={<Paises />} />
            </Routes>
            <Routes>
                <Route path="/continentes" element={<Continentes />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;