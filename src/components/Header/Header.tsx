import NavButton from "../NavButton/NavButton";
import "./Header.css";

const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                GeoPedia
            </div>
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