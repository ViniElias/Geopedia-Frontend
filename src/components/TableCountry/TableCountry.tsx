import "./TableCountry.css";
import { traduzir } from "../../utils/translations";
import type { Pais, SortKeyCountry, SortDirection } from "../../types";

interface TableCountryProps {
    paises: Pais[];
    onEdit: (pais: Pais) => void;
    onDelete: (id: number) => void;
    onSort: (key: SortKeyCountry) => void;
    sortKey: SortKeyCountry;
    sortDirection: SortDirection;
};

const TableCountry: React.FC<TableCountryProps> = ({
    paises,
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
                    <button onClick={() => onSort('populacao')}>
                        População
                        {sortKey === 'populacao' && <SortArrow direction={sortDirection} />}
                    </button>
                </th>
                <th className="h3">
                    <button onClick={() => onSort('idioma')}>
                        Idioma
                        {sortKey === 'idioma' && <SortArrow direction={sortDirection} />}
                    </button>
                </th>
                <th className="h4">
                    <button onClick={() => onSort('moeda')}>
                        Moeda
                        {sortKey === 'moeda' && <SortArrow direction={sortDirection} />}
                    </button>
                </th>
                <th className="h5">Ações</th>
            </tr>

            <tbody>
                {paises.length === 0 ? (
                    <tr className="table-row">
                        <td colSpan={5}>Nenhum país cadastrado.</td>
                    </tr>
                ) : (
                    paises.map((pais) => (
                        <tr className="table-row" key={pais.id}>
                            <td>{pais.nome}</td>
                            <td>{pais.populacao}</td>
                            <td>{traduzir(pais.idioma)}</td>
                            <td>{traduzir(pais.moeda)}</td>
                            <td className="actions">
                                <button className="icon-button edit-button"
                                    onClick={() => onEdit(pais)}>
                                    <i className="bi bi-pencil-fill"></i>
                                </button>
                                <button className="icon-button delete-button"
                                    onClick={() => onDelete(pais.id)}>
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

export default TableCountry;