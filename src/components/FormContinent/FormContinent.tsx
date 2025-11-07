import { useState } from 'react';
import './FormContinent.css'

interface FormContinentProps {
    onClose: () => void;
    onSaveSuccess: () => void;
}

const FormContinent: React.FC<FormContinentProps> = ({ onClose, onSaveSuccess }) => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [error, setError] = useState<string | null>(null);

    const HandleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        try {
            // Chamando a rota POST do backend
            const response = await fetch('http://localhost:3001/continentes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, descricao }),
            });

            // Verificando a resposta
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao salvar continente.');
            }

            onSaveSuccess();
            onClose();
        } catch (error: any) {
            console.error(error);
            setError(error.message);
        }
    };

    return (
        <form onSubmit={HandleSubmit} className="modal-form">
            <h2>Cadastrar continente</h2>

            <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" name="nome" value={nome} required 
                    onChange={(e) => setNome(e.target.value)}/>
            </div>

            <div className="form-group">
                <label htmlFor="descricao">Descrição</label>
                <textarea id="descricao" name="descricao" rows={4} value={descricao} required 
                    onChange={(e) => setDescricao(e.target.value)}/>
            </div>

            {/* Em caso de erro */}
            {error && <p className="form-error">{error}</p>}

            <div className="form-buttons">
                <button type="button" className="btn-cancel" onClick={onClose}>
                    Cancelar
                </button>
                <button type="submit" className="btn-submit">
                    Salvar
                </button>
            </div>
        </form>
    );
};

export default FormContinent;