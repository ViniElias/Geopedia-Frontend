import { NavLink } from "react-router-dom";

interface NavButtonProps {
    name: string
    path: string
}

const NavButton = ({ name, path }: NavButtonProps) => {
    return (
        <NavLink to={path}>
            {name}
        </NavLink>
    )
}

export default NavButton;