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
    const [isModalOpen, setIsmodalOpen] = useState(false);
    const [detailsModal, setDetailsModal] = useState(false);
    const [cidades, setCidades] = useState<Cidade[]>([]);
    const [paises, setPaises] = useState<Pais[]>([]);
    const [editingCity, setEditingCity] = useState<Cidade | null>(null);
    const [viewingCity, setViewingCity] = useState<Cidade | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState<SortKeyCity>('nome');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const openModal = () => setIsmodalOpen(true);
    const closeModal = () => {
        setIsmodalOpen(false);
        setEditingCity(null);
    };

    const fetchCidades = async () => {
        try {
            const response = await fetch('http://localhost:3001/cidades');
            const data = await response.json();
            setCidades(data);
        } catch (error) {
            console.error("Erro ao buscar cidades", error);
        }
    };

    const fetchPaises = async () => {
        try {
            const response = await fetch('http://localhost:3001/paises');
            const data = await response.json();
            setPaises(data);
        } catch (error) {
            console.error("Erro ao buscar países: ", error);
        }
    };

    useEffect(() => {
        fetchCidades();
        fetchPaises();
    }, []);

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
            await fetch(`http://localhost:3001/cidades/${id}`, {
                method: 'DELETE',
            });

            fetchCidades();
        } catch (error) {
            console.error("Erro ao excluir cidade: ", error);
        }
    };

    const processedCidades = useMemo(() => {
        const filtered = cidades.filter(cidade =>
            cidade.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const sorted = [...filtered];
        sorted.sort((a, b) => {
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

        return sorted;
    }, [cidades, searchTerm, sortKey, sortDirection]);

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
                    <SearchBar
                        placeholder="Digite o nome de uma cidade"
                        onSearch={setSearchTerm} />
                    <TableCity
                        cidades={processedCidades}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onView={openDetailsModal}
                        onSort={handleSort}
                        sortKey={sortKey}
                        sortDirection={sortDirection} />
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