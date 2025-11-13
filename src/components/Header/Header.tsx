import { Link } from "react-router-dom";
import NavButton from "../NavButton/NavButton";
import "./Header.css";

const Header = () => {
    return (
        <div className="header">
            <Link to="/">
                <div className="logo">
                    <img src="./public/logo.png" alt="Logo Geopedia"/>
                    Geopedia
                </div>
            </Link>
            
            <div className="navbar">
                <NavButton name="Início" path="/" />
                <NavButton name="Cidades" path="/cidades" />
                <NavButton name="Países" path="/paises" />
                <NavButton name="Continentes" path="/continentes" />
            </div>
        </div>
    )
}

export default Header;