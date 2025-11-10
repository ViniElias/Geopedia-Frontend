import { useEffect, useMemo, useState } from "react";
import AddButton from "../components/AddButton/AddButton";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import TableContinent from "../components/TableContinent/TableContinent";
import Modal from "../components/Modal/Modal";
import FormContinent from "../components/FormContinent/FormContinent";
import type { SortDirection, Continente, SortKeyContinente } from "../types";

const Continentes = () => {
    const [isModalOpen, setIsmodalOpen] = useState(false);
    const [continentes, setContinentes] = useState<Continente[]>([]);
    const [editingContinent, setEditingContinent] = useState<Continente | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState<SortKeyContinente>('nome');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const openModal = () => setIsmodalOpen(true);
    const closeModal = () => {
        setIsmodalOpen(false);
        setEditingContinent(null);
    };

    // Busca os dados da API
    const fetchContinentes = async () => {
        try {
            const response = await fetch('http://localhost:3001/continentes');
            const data = await response.json();
            setContinentes(data);
        } catch (error) {
            console.error("Erro ao buscar continentes: ", error);
        }
    };

    // useEffect chama a função quando a página carrega
    // Lista vazia [] significa para executar apenas uma vez, quando montar
    useEffect(() => {
        fetchContinentes();
    }, []);

    const handleEdit = (continente: Continente) => {
        setEditingContinent(continente);
        openModal();
    };

    const handleAddClick = () => {
        setEditingContinent(null);
        openModal();
    };

    const handleSaveSuccess = () => {
        fetchContinentes();
        closeModal();
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Tem certeza que deseja excluir?")) {
            return;
        }

        try {
            await fetch(`http://localhost:3001/continentes/${id}`, {
                method: 'DELETE',
            });

            fetchContinentes();
        } catch (error) {
            console.error("Erro ao excluir continente: ", error);
        }
    };

    // useMemo garante que o filtro só rode quando a lista ou o termo mudarem
    const processedContinentes = useMemo(() => {
        const filtered = continentes.filter(continente =>
            continente.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const sorted = [...filtered];
        sorted.sort((a, b) => {
            const valA = a[sortKey] || '';
            const valB = b[sortKey] || '';

            // localeCompare para ordenação alfabética correta (não é case sensitive)
            const comparison = valA.localeCompare(valB, 'pt-BR', { sensitivity: 'base' });
            return sortDirection === 'asc' ? comparison : -comparison;
        });

        return sorted;

    }, [continentes, searchTerm, sortKey, sortDirection]);

    const handleSort = (key: SortKeyContinente) => {
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
                    <h1>Continentes</h1>
                    <AddButton name="continente" onClick={handleAddClick} />
                </div>
                <div className="table-content">
                    <SearchBar
                        placeholder="Digite o nome de um continente"
                        onSearch={setSearchTerm} />
                    <TableContinent
                        continentes={processedContinentes}
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
                    <FormContinent onClose={closeModal} onSaveSuccess={handleSaveSuccess} currentData={editingContinent} />
                </Modal>
            )}
        </>
    )
}

export default Continentes;