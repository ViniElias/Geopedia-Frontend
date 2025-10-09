import { NavLink } from "react-router-dom";
import './NavButton.css';

interface NavButtonProps {
    name: string
    path: string
}

const NavButton = ({ name, path }: NavButtonProps) => {
    return (
        <NavLink to={path} className="navButton">
            {name}
        </NavLink>
    )
}

export default NavButton;