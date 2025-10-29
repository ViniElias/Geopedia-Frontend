import "./Card.css";

interface CardProps {
    title: string;
    desc: string;
};

const Card: React.FC<CardProps> = ({title, desc}) => {
    return (
        <div className="card-content">
            <h1 className="card-title">{title}</h1>
            <p className="desc-title">{desc}</p>
        </div>
    )
}

export default Card;