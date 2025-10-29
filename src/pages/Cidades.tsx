import AddButton from "../components/AddButton/AddButton";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

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
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default Cidades;