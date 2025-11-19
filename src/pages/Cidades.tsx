import { useEffect, useMemo, useState } from "react";
import Modal from "../components/Modal/Modal";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import FormCity from "../components/FormCity/FormCity";
import AddButton from "../components/AddButton/AddButton";
import SearchBar from "../components/SearchBar/SearchBar";
import TableCity from "../components/TableCity/TableCity";
import type { Cidade, SortDirection, SortKeyCity, Pais } from "../types";
import CityDetails from "../components/CityDetails/CityDetails";

const Cidades = () => {
    const [cidades, setCidades] = useState<Cidade[]>([]);
    const [paises, setPaises] = useState<Pais[]>([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCountry, setSelectedCountry] = useState<string>('');

    const [isModalOpen, setIsmodalOpen] = useState(false);
    const [detailsModal, setDetailsModal] = useState(false);
    const [editingCity, setEditingCity] = useState<Cidade | null>(null);
    const [viewingCity, setViewingCity] = useState<Cidade | null>(null);

    const [sortKey, setSortKey] = useState<SortKeyCity>('nome');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const openModal = () => setIsmodalOpen(true);
    const closeModal = () => {
        setIsmodalOpen(false);
        setEditingCity(null);
    };

    const fetchCidades = async () => {
        try {
            const response = await fetch('http://localhost:3001/cidades?limit=10000');
            const data = await response.json();

            if (data.data) {
                setCidades(data.data);
            } else {
                setCidades(data);
            }

        } catch (error) {
            console.error("Erro ao buscar cidades", error);
        }
    };

    const fetchPaises = async () => {
        try {
            const response = await fetch('http://localhost:3001/paises?limit=1000');
            const data = await response.json();

            if (data.data) {
                setPaises(data.data);
            } else {
                setPaises(data);
            }
        } catch (error) {
            console.error("Erro ao buscar países: ", error);
        }
    };

    useEffect(() => {
        fetchCidades();
        fetchPaises();
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

    const handleEdit = (cidade: Cidade) => {
        setEditingCity(cidade);
        openModal();
    };

    const handleAddClick = () => {
        setEditingCity(null);
        openModal();
    };

    const handleSaveSuccess = () => {
        fetchCidades();
        closeModal();
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Tem certeza que deseja excluir?")) {
            return;
        }

        try {
            await fetch(`http://localhost:3001/cidades/${id}`, { method: 'DELETE' });
            setCidades(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error("Erro ao excluir cidade: ", error);
        }
    };

    const processedCidades = useMemo(() => {
        let result = cidades.filter(cidade =>
            cidade.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (selectedCountry) {
            result = result.filter(cidade =>
                cidade.id_pais === Number(selectedCountry)
            );
        }

        result.sort((a, b) => {
            const valA = a[sortKey] || '';
            const valB = b[sortKey] || '';

            let comparison = 0;

            if (sortKey === 'nome') {
                const strA = (valA as string | null) || '';
                const strB = (valB as string | null) || '';
                comparison = strA.localeCompare(strB, 'pt-BR', { sensitivity: 'base' });
            } else {
                const numA = (valA as number | null) || 0;
                const numB = (valB as number | null) || 0;
                comparison = numA - numB; // Ordenação numérica simples
            }

            return sortDirection === 'asc' ? comparison : -comparison;
        });

        return result;
    }, [cidades, searchTerm, sortKey, sortDirection, selectedCountry]);

    const totalPages = Math.ceil(processedCidades.length / itemsPerPage);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * itemsPerPage;
        const lastPageIndex =  firstPageIndex + itemsPerPage;
        return processedCidades.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, processedCidades]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCountry]);

    const handleSort = (key: SortKeyCity) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };

    const openDetailsModal = (cidade: Cidade) => {
        setViewingCity(cidade);
        setDetailsModal(true);
    };

    const closeDetailsModal = () => {
        setDetailsModal(false);
        setViewingCity(null);
    };

    return (
        <>
            <div>
                <Header />
            </div>
            <div className="crud-content">
                <div className="top-content">
                    <h1>Cidades</h1>
                    <AddButton name="cidade" onClick={handleAddClick} />
                </div>
                <div className="table-content">
                    <div className="filter-container">
                        <SearchBar
                            placeholder="Digite o nome de uma cidade"
                            onSearch={setSearchTerm} />

                        <select
                            id="pais-filter"
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                        >
                            <option value="">País</option>
                            {paises.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <TableCity
                        cidades={currentTableData}
                        paises={paises}
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
                    <FormCity
                        onClose={closeModal}
                        onSaveSuccess={handleSaveSuccess}
                        currentData={editingCity}
                        paises={paises} />
                </Modal>
            )}

            {detailsModal && viewingCity && (
                <CityDetails
                    cidade={viewingCity}
                    onClose={closeDetailsModal}
                    paises={paises}
                />
            )}
        </>
    )
}

export default Cidades;