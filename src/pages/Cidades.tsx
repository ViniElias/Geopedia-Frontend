import AddButton from "../components/AddButton/AddButton";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import TableCity from "../components/TableCity/TableCity";

const Cidades = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="crud-content">
                <div className="top-content">
                    <h1>Cidades</h1>
                    <AddButton name="cidade" />
                </div>
                <div className="table-content">
                    <SearchBar />
                    <TableCity />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default Cidades;