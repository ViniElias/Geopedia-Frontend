import AddButton from "../components/AddButton/AddButton";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";

const Paises = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="crud-content">
                <div className="top-content">
                    <h1>Países</h1>
                    <AddButton name="país" />
                </div>
                <div className="table-content">
                    <SearchBar />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default Paises;