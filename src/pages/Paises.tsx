import { useEffect, useMemo, useState } from "react";
import AddButton from "../components/AddButton/AddButton";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import TableCountry from "../components/TableCountry/TableCountry";
import type { SortDirection, SortKeyCountry, Pais } from "../types";
import Modal from "../components/Modal/Modal";
import FormCountry from "../components/FormCountry/FormCountry";

const Paises = () => {
    const [isModalOpen, setIsmodalOpen] = useState(false);
    const [paises, setPaises] = useState<Pais[]>([]);
    const [editingCountry, setEditingCountry] = useState<Pais | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState<SortKeyCountry>('nome');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const openModal = () => setIsmodalOpen(true);
    const closeModal = () => {
        setIsmodalOpen(false);
        setEditingCountry(null);
    };

    const fetchPaises = async () => {
        try {
            const response = await fetch('http://localhost:3001/paises');
            const data = await response.json();
            setPaises(data);
        } catch (error) {
            console.error("Erro ao buscar países", error);
        }
    };

    useEffect(() => {
        fetchPaises();
    }, []);

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
            await fetch(`http://localhost:3001/paises/${id}`, {
                method: 'DELETE',
            });

            fetchPaises();
        } catch (error) {
            console.error("Erro ao excluir país: ", error);
        }
    };

    const processedPaises = useMemo(() => {
        const filtered = paises.filter(pais =>
            pais.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const sorted = [...filtered];
        sorted.sort((a, b) => {
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

        return sorted;
    }, [paises, searchTerm, sortKey, sortDirection]);

    const handleSort = (key: SortKeyCountry) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };

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
                    <SearchBar
                        placeholder="Digite o nome de um país"
                        onSearch={setSearchTerm} />
                    <TableCountry
                        paises={processedPaises}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
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
                    <FormCountry onClose={closeModal} onSaveSuccess={handleSaveSuccess} currentData={editingCountry} />
                </Modal>
            )}
        </>
    )
}

export default Paises;