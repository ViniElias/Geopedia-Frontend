import { useEffect, useMemo, useState } from "react";
import AddButton from "../components/AddButton/AddButton";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import TableCountry from "../components/TableCountry/TableCountry";
import type { SortDirection, SortKeyCountry, Pais, Continente } from "../types";
import Modal from "../components/Modal/Modal";
import FormCountry from "../components/FormCountry/FormCountry";
import CountryDetails from "../components/CountryDetails/CountryDetails";

const Paises = () => {
    const [paises, setPaises] = useState<Pais[]>([]);
    const [continentes, setContinentes] = useState<Continente[]>([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedContinent, setSelectedContinent] = useState<string>('');

    const [isModalOpen, setIsmodalOpen] = useState(false);
    const [detailsModal, setDetailsModal] = useState(false);
    const [editingCountry, setEditingCountry] = useState<Pais | null>(null);
    const [viewingCountry, setViewingCountry] = useState<Pais | null>(null);

    const [sortKey, setSortKey] = useState<SortKeyCountry>('nome');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const openModal = () => setIsmodalOpen(true);
    const closeModal = () => {
        setIsmodalOpen(false);
        setEditingCountry(null);
    };

    const fetchPaises = async () => {
        try {
            const response = await fetch('http://localhost:3001/paises?&limit=1000');
            const data = await response.json();

            if (data.data) {
                setPaises(data.data);
            } else {
                setPaises(data);
            }
        } catch (error) {
            console.error("Erro ao buscar países", error);
        }
    };

    const fetchContinentes = async () => {
        try {
            const response = await fetch('http://localhost:3001/continentes?limit=100');
            const data = await response.json();
            setContinentes(data.data || data);
        } catch (error) {
            console.error("Erro ao buscar continentes: ", error);
        }
    };

    useEffect(() => {
        fetchPaises();
        fetchContinentes();
    }, []);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleEdit = (pais: Pais) => {
        setEditingCountry(pais);
        openModal();
    };

    const handleAddClick = () => {
        setEditingCountry(null);
        openModal();
    };

    const handleSaveSuccess = () => {
        fetchPaises();
        closeModal();
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Tem certeza que deseja excluir?")) {
            return;
        }

        try {
            await fetch(`http://localhost:3001/paises/${id}`, { method: 'DELETE' });
            setPaises(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error("Erro ao excluir país: ", error);
        }
    };

    const processedPaises = useMemo(() => {
        let result = paises.filter(pais =>
            pais.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (selectedContinent) {
            result = result.filter(pais =>
                pais.id_continente === Number(selectedContinent)
            );
        }

        result.sort((a, b) => {
            const valA = a[sortKey] || '';
            const valB = b[sortKey] || '';

            let comparison = 0;

            if (sortKey === 'populacao') {
                const numA = (valA as number | null) || 0;
                const numB = (valB as number | null) || 0;
                comparison = numA - numB; // Ordenação numérica simples
            } else {
                const strA = (valA as string | null) || '';
                const strB = (valB as string | null) || '';
                comparison = strA.localeCompare(strB, 'pt-BR', { sensitivity: 'base' });
            }

            return sortDirection === 'asc' ? comparison : -comparison;
        });

        return result;
    }, [paises, searchTerm, sortKey, sortDirection, selectedContinent]);

    const totalPages = Math.ceil(processedPaises.length / itemsPerPage);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * itemsPerPage;
        const lastPageIndex = firstPageIndex + itemsPerPage;
        return processedPaises.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, processedPaises]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedContinent]);

    const handleSort = (key: SortKeyCountry) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };

    const openDetailsModal = (pais: Pais) => {
        setViewingCountry(pais);
        setDetailsModal(true);
    };

    const closeDetailsModal = () => {
        setDetailsModal(false);
        setViewingCountry(null);
    }

    return (
        <>
            <div>
                <Header />
            </div>
            <div className="crud-content">
                <div className="top-content">
                    <h1>Países</h1>
                    <AddButton name="país" onClick={handleAddClick} />
                </div>
                <div className="table-content">
                    <div className="filter-container">
                        <SearchBar
                            placeholder="Digite o nome de um país"
                            onSearch={setSearchTerm} />

                        <select
                            id="continente-filter"
                            value={selectedContinent}
                            onChange={(e) => setSelectedContinent(e.target.value)}
                        >
                            <option value="">Continente</option>
                            {continentes.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <TableCountry
                        paises={currentTableData}
                        continentes={continentes}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onView={openDetailsModal}
                        onSort={handleSort}
                        sortKey={sortKey}
                        sortDirection={sortDirection} />

                    <div className="pagination-controls">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="pagination-button"
                        >
                            Anterior
                        </button>

                        <span>Página {currentPage} de {totalPages}</span>

                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="pagination-button"
                        >
                            Próximo
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>

            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <FormCountry onClose={closeModal} onSaveSuccess={handleSaveSuccess} currentData={editingCountry} />
                </Modal>
            )}

            {detailsModal && viewingCountry && (
                <CountryDetails
                    pais={viewingCountry}
                    onClose={closeDetailsModal}
                    continentes={continentes}
                />
            )}
        </>
    )
}

export default Paises;