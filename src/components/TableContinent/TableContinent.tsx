import type { Continente } from "../../types";
import "./TableContinent.css";

interface TableContinentProps {
    continentes: Continente[];
    onEdit: (continente: Continente) => void;
    onDelete: (id: number) => void;
}

const TableContinent: React.FC<TableContinentProps> = ({ continentes, onEdit, onDelete }) => {
    return (
        <table className="table">
            <tr className="table-header">
                <th className="h1">Nome</th>
                <th className="h2">Descrição</th>
                <th className="h3">Ações</th>
            </tr>

            <tbody>
                {continentes.length === 0 ? (
                    <tr className="table-row">
                        <td colSpan={3}>Nenhum continente cadastrado.</td>
                    </tr>
                ) : (
                    continentes.map((continente) => (
                        <tr className="table-row" key={continente.id}>
                            <td>{continente.nome}</td>
                            <td>{continente.descricao}</td>
                            <td className="actions">
                                <button className="icon-button edit-button"
                                    onClick={() => onEdit(continente)}>
                                    <i className="bi bi-pencil-fill"></i>
                                </button>
                                <button className="icon-button delete-button"
                                    onClick={() => onDelete(continente.id)}>
                                    <i className="bi bi-trash3-fill"></i>
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )
}

export default TableContinent;