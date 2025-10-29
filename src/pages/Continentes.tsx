import AddButton from "../components/AddButton/AddButton";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const Continentes = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="crud-content">
                <div className="top-content">
                    <h1>Continentes</h1>
                    <AddButton name="continente" />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default Continentes;