import NavButton from "../NavButton/NavButton";

const Header = () => {
    return (
        <div>
            <NavButton name="Início" path="/" />
            <NavButton name="Cidades" path="/cidades" />
            <NavButton name="Países" path="/paises" />
            <NavButton name="Continentes" path="/continentes" />
        </div>
    )
}

export default Header;