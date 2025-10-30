import "./TableContinent.css";

const TableContinent = () => {
    return (
        <table className="table">
            <tr className="table-header">
                <th className="h1">Nome</th>
                <th className="h2">Descrição</th>
            </tr>
            <tr className="table-row">
                <td>Europa</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem commodi maxime distinctio voluptates mollitia veritatis cum facilis impedit aut iusto!</td>
            </tr>
            <tr className="table-row">
                <td>Nova Iorque</td>
                <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam et mollitia saepe at fugit dolorum ducimus error repudiandae non suscipit?</td>
            </tr>
            <tr className="table-row">
                <td>Belo Horizonte</td>
                <td>2.300.000</td>
            </tr>
            <tr className="table-row">
                <td>Moscou</td>
                <td>13.200.000</td>
            </tr>
            <tr className="table-row">
                <td>Pequim</td>
                <td>21.450.000</td>
            </tr>
        </table>
    )
}

export default TableContinent;