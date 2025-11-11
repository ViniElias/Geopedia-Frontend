import "./TableCity.css";
import type { Cidade, SortKeyCity, SortDirection } from "../../types";

interface TableCityProps {
    cidades: Cidade[];
    onEdit: (cidade: Cidade) => void;
    onDelete: (id: number) => void;
    onView: (cidade: Cidade) => void;
    onSort: (key: SortKeyCity) => void;
    sortKey: SortKeyCity;
    sortDirection: SortDirection;
};

const TableCity: React.FC<TableCityProps> = ({
    cidades,
    onEdit,
    onDelete,
    onView,
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
            <thead>
                <tr className="table-header">
                    <th className="h1">
                        <button onClick={() => onSort('nome')}>
                            Nome
                            {sortKey === 'nome' && <SortArrow direction={sortDirection} />}
                        </button>
                    </th>
                    <th className="h2">
                        <button onClick={() => onSort('populacao')}>
                            População
                            {sortKey === 'populacao' && <SortArrow direction={sortDirection} />}
                        </button>
                    </th>
                    <th className="h3">
                        <button onClick={() => onSort('latitude')}>
                            Latitude
                            {sortKey === 'latitude' && <SortArrow direction={sortDirection} />}
                        </button>
                    </th>
                    <th className="h4">
                        <button onClick={() => onSort('longitude')}>
                            Longitude
                            {sortKey === 'longitude' && <SortArrow direction={sortDirection} />}
                        </button>
                    </th>
                    <th className="h5">Ações</th>
                </tr>
            </thead>

            <tbody>
                {cidades.length === 0 ? (
                    <tr className="table-row">
                        <td colSpan={5}>Nenhuma cidade cadastrada.</td>
                    </tr>
                ) : (
                    cidades.map((cidade) => (
                        <tr className="table-row" key={cidade.id}>
                            <td>{cidade.nome}</td>
                            <td>{cidade.populacao}</td>
                            <td>{cidade.latitude}</td>
                            <td>{cidade.longitude}</td>
                            <td className="actions">
                                <button className="icon-button view-button"
                                    onClick={() => onView(cidade)}>
                                    <i className="bi bi-eye-fill"></i>
                                </button>
                                <button className="icon-button edit-button"
                                    onClick={() => onEdit(cidade)}>
                                    <i className="bi bi-pencil-fill"></i>
                                </button>
                                <button className="icon-button delete-button"
                                    onClick={() => onDelete(cidade.id)}>
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

export default TableCity;