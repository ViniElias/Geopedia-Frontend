import "./TableCity.css";

const TableCity = () => {
    return (
        <table className="table">
            <tr className="table-header">
                <th>Nome</th>
                <th>População</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>País</th>
            </tr>
            <tr className="table-row">
                <td>São José dos Campos</td>
                <td>700.000</td>
                <td>213.3221</td>
                <td>753.3251</td>
                <td>Brasil</td>
            </tr>
            <tr className="table-row">
                <td>Nova Iorque</td>
                <td>8.500.000</td>
                <td>213.3221</td>
                <td>753.3251</td>
                <td>EUA</td>
            </tr>
            <tr className="table-row">
                <td>Belo Horizonte</td>
                <td>2.300.000</td>
                <td>213.3221</td>
                <td>753.3251</td>
                <td>Brasil</td>
            </tr>
            <tr className="table-row">
                <td>Moscou</td>
                <td>13.200.000</td>
                <td>213.3221</td>
                <td>753.3251</td>
                <td>Rússia</td>
            </tr>
            <tr className="table-row">
                <td>Pequim</td>
                <td>21.450.000</td>
                <td>213.3221</td>
                <td>753.3251</td>
                <td>China</td>
            </tr>
        </table>
    )
}

export default TableCity;