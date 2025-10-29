import "./AddButton.css";

interface ButtonProps {
    name: string;
}

const AddButton: React.FC<ButtonProps> = ({name}) => {
    return (
        <button className="add-button">
            + Adicionar {name}
        </button>
    )
}

export default AddButton;