import { useState } from "react";
import AddButton from "../components/AddButton/AddButton";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import TableContinent from "../components/TableContinent/TableContinent";
import Modal from "../components/Modal/Modal";
import FormContinent from "../components/FormContinent/FormContinent";

const Continentes = () => {
    const [isModalOpen, setIsmodalOpen] = useState(false);
    const openModal = () => setIsmodalOpen(true);
    const closeModal = () => setIsmodalOpen(false);

    return (
        <>
            <div>
                <Header />
            </div>
            <div className="crud-content">
                <div className="top-content">
                    <h1>Continentes</h1>
                    <AddButton name="continente" onClick={openModal}/>
                </div>
                <div className="table-content">
                    <SearchBar />
                    <TableContinent />
                </div>
            </div>
            <div>
                <Footer />
            </div>

            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <FormContinent onClose={closeModal} />
                </Modal>
            )}
        </>
    )
}

export default Continentes;