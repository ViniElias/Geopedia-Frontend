import { useEffect, useState } from 'react';
import './FormContinent.css';
import type { Continente } from '../../types';

interface FormContinentProps {
    onClose: () => void;
    onSaveSuccess: () => void;
    currentData: Continente | null;
}

const FormContinent: React.FC<FormContinentProps> = ({ onClose, onSaveSuccess, currentData }) => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [error, setError] = useState<string | null>(null);
    const isEditing = currentData !== null;

    useEffect(() => {
        if (isEditing) {
            setNome(currentData.nome);
            setDescricao(currentData.descricao || '');
        } else {
            setNome('');
            setDescricao('');
        }
    }, [currentData, isEditing]);

    const HandleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        const url = isEditing
            ? `http://localhost:3001/continentes/${currentData.id}`
            : 'http://localhost:3001/continentes';

        const method = isEditing ? 'PUT' : 'POST';

        try {
            // Chamando a rota POST do backend
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, descricao }),
            });

            // Verificando a resposta
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Erro ao ${isEditing ? 'atualizar' : 'salvar'} continente`);
            }

            onSaveSuccess();
        } catch (error: any) {
            console.error(error);
            setError(error.message);
        }
    };

    return (
        <form onSubmit={HandleSubmit} className="modal-form">
            <h2>{isEditing ? 'Atualizar Continente' : 'Adicionar Novo Continente'}</h2>

            <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" name="nome" value={nome} required
                    onChange={(e) => setNome(e.target.value)} />
            </div>

            <div className="form-group">
                <label htmlFor="descricao">Descrição</label>
                <textarea id="descricao" name="descricao" rows={4} value={descricao}
                    onChange={(e) => setDescricao(e.target.value)} />
            </div>

            {/* Em caso de erro */}
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

export default FormContinent;