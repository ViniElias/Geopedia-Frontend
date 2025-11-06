import "./AddButton.css";

interface ButtonProps {
    name: string;
    onClick: () => void;
}

const AddButton: React.FC<ButtonProps> = ({name, onClick}) => {
    return (
        <button className="add-button" onClick={onClick}>
            + Adicionar {name}
        </button>
    )
}

export default AddButton;