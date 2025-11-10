import { useEffect, useState } from "react";
import '../FormContinent/FormContinent.css';
import './FormCountry.css';
import type { Pais, Continente } from "../../types";

interface FormCountryProps {
    onClose: () => void;
    onSaveSuccess: () => void;
    currentData: Pais | null;
}

const FormCountry: React.FC<FormCountryProps> = ({ onClose, onSaveSuccess, currentData }) => {
    const [nome, setNome] = useState('');
    const [populacao, setPopulacao] = useState('');
    const [idioma, setIdioma] = useState('');
    const [moeda, setMoeda] = useState('');
    const [idContinente, setIdContinente] = useState('');
    const [continentes, setContinentes] = useState<Continente[]>([]);
    const [error, setError] = useState<string | null>(null);
    const isEditing = currentData !== null;

    useEffect(() => {
        const fetchContinentes = async () => {
            try {
                const response = await fetch('http://localhost:3001/continentes');
                const data = await response.json();
                setContinentes(data);
            } catch (error) {
                console.error("Erro ao buscar continentes: ", error);
                setError("Não foi possível carregar a lista de continentes.");
            }
        };

        fetchContinentes();
    }, []);

    useEffect(() => {
        if (isEditing && currentData) {
            setNome(currentData.nome);
            setPopulacao(String(currentData.populacao || ''));
            setIdioma(currentData.idioma || '');
            setMoeda(currentData.moeda || '');
            setIdContinente(String(currentData.id_continente || ''));
        } else {
            setNome('');
            setPopulacao('');
            setIdioma('');
            setMoeda('');
            setIdContinente('');
        }
    }, [currentData, isEditing]);

    const HandleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        const url = isEditing
            ? `http://localhost:3001/paises/${currentData.id}`
            : 'http://localhost:3001/paises';

        const method = isEditing ? 'PUT' : 'POST';

        let payload;

        if (isEditing) {
            payload = {
                nome: nome,
                populacao: populacao || null,
                idioma: idioma || null,
                moeda: moeda || null,
                id_continente: idContinente
            };
        } else {
            payload = {
                nome: nome,
                id_continente: idContinente
            };
        };

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Erro ao ${isEditing ? 'atualizar' : 'salvar'} país`);
            }

            onSaveSuccess();
        } catch (error: any) {
            console.error(error);
            setError(error.message);
        }
    };

    return (
        <form onSubmit={HandleSubmit} className="modal-form">
            <h2>{isEditing ? 'Atualizar País' : 'Adicionar Novo País'}</h2>

            <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" name="nome" value={nome} required
                    onChange={(e) => setNome(e.target.value)} />
            </div>

            <div className="form-group">
                <label htmlFor="continente">Continente</label>
                <select name="continente" id="continente" value={idContinente}
                    onChange={(e) => setIdContinente(e.target.value)} required>

                    <option value="">Selecione um continente</option>

                    {continentes.map((continente) => (
                        <option key={continente.id} value={continente.id}>
                            {continente.nome}
                        </option>
                    ))}
                </select>
            </div>

            {/* Esses campos só aparecem em caso de edição */}
            {isEditing && (
                <>
                    <div className="form-group">
                        <label htmlFor="populacao">População</label>
                        <input type="number" id="populacao" name="populacao" value={populacao}
                            onChange={(e) => setPopulacao(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="idioma">Idioma</label>
                        <input type="text" id="idioma" name="idioma" value={idioma}
                            onChange={(e) => setIdioma(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="moeda">Moeda</label>
                        <input type="text" id="moeda" name="moeda" value={moeda}
                            onChange={(e) => setMoeda(e.target.value)} />
                    </div>
                </>
            )}

            {error && <p className="form-error">{error}</p>}

            <div className="form-buttons">
                <button type="button" className="btn-cancel" onClick={onClose}>
                    Cancelar
                </button>
                <button type="submit" className="btn-submit">
                    {isEditing ? 'Atualizar' : 'Salvar'}
                </button>
            </div>
        </form>
    );
};

export default FormCountry;