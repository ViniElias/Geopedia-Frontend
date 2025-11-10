import type { Continente, SortKeyContinente, SortDirection } from "../../types";
import "./TableContinent.css";

interface TableContinentProps {
    continentes: Continente[];
    onEdit: (continente: Continente) => void;
    onDelete: (id: number) => void;
    onSort: (key: SortKeyContinente) => void;
    sortKey: SortKeyContinente;
    sortDirection: SortDirection;
};

const TableContinent: React.FC<TableContinentProps> = ({
    continentes,
    onEdit,
    onDelete,
    onSort,
    sortKey,
    sortDirection
}) => {

    const SortArrow = ({ direction }: { direction: SortDirection }) => {
        return (
            <span className="sort-arrow">
                {direction === 'asc' ? '🔼' : '🔽'}
            </span>
        );
    };

    return (
        <table className="table">
            <tr className="table-header">
                <th className="h1">
                    <button onClick={() => onSort('nome')}>
                        Nome
                        {sortKey === 'nome' && <SortArrow direction={sortDirection} />}
                    </button>
                </th>
                <th className="h2">
                    <button onClick={() => onSort('descricao')}>
                        Descrição
                        {sortKey === 'descricao' && <SortArrow direction={sortDirection} />}
                    </button>
                </th>
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