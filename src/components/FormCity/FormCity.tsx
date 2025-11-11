import { useEffect, useState } from "react";
import type { Pais, Cidade } from "../../types";

interface FormCityProps {
    onClose: () => void;
    onSaveSuccess: () => void;
    currentData: Cidade | null;
    paises: Pais[];
}

const FormCity: React.FC<FormCityProps> = ({ onClose, onSaveSuccess, currentData, paises }) => {
    const [nome, setNome] = useState('');
    const [populacao, setPopulacao] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [idPais, setIdPais] = useState('');
    const [error, setError] = useState<string | null>(null);
    const isEditing = currentData !== null;

    useEffect(() => {
        if (isEditing && currentData) {
            setNome(currentData.nome);
            setPopulacao(String(currentData.populacao || ''));
            setLatitude(String(currentData.latitude || ''));
            setLongitude(String(currentData.longitude || ''));
            setIdPais(String(currentData.id_pais || ''));
        } else {
            setNome('');
            setPopulacao('');
            setLatitude('');
            setLongitude('');
            setIdPais('');
        }
    }, [currentData, isEditing]);

    const HandleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        const url = isEditing
            ? `http://localhost:3001/cidades/${currentData.id}`
            : 'http://localhost:3001/cidades';

        const method = isEditing ? 'PUT' : 'POST';

        let payload;

        if (isEditing) {
            payload = {
                nome: nome,
                populacao: populacao,
                latitude: latitude || null,
                longitude: longitude || null,
                id_pais: idPais
            };
        } else {
            payload = {
                nome: nome,
                populacao,
                id_pais: idPais
            }
        }

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
                throw new Error(errorData.error || `Erro ao ${isEditing ? 'atualizar' : 'salvar'} cidade`);
            }

            onSaveSuccess();
        } catch (error: any) {
            console.error(error);
            setError(error.message);
        }
    };

    return (
        <form onSubmit={HandleSubmit} className="modal-form">
            <h2>{isEditing ? 'Atualizar Cidade' : 'Adicionar Nova Cidade'}</h2>

            <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" name="nome" value={nome} required
                    onChange={(e) => setNome(e.target.value)} />
            </div>

            <div className="form-group">
                <label htmlFor="populacao">População</label>
                <input type="number" id="populacao" name="populacao" value={populacao}
                    onChange={(e) => setPopulacao(e.target.value)} />
            </div>

            <div className="form-group">
                <label htmlFor="pais">País</label>
                <select name="pais" id="pais" value={idPais}
                    onChange={(e) => setIdPais(e.target.value)} required>

                    <option value="">Selecione um país</option>

                    {paises.map((pais) => (
                        <option key={pais.id} value={pais.id}>
                            {pais.nome}
                        </option>
                    ))}
                </select>
            </div>

            {/* Esses campos só aparecem em caso de edição */}
            {isEditing && (
                <>
                    <div className="form-group">
                        <label htmlFor="latitude">Latitude</label>
                        <input type="number" id="latitude" name="latitude" value={latitude}
                            onChange={(e) => setLatitude(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="longitude">Longitude</label>
                        <input type="number" id="longitude" name="longitude" value={longitude}
                            onChange={(e) => setLongitude(e.target.value)} />
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
    )
}

export default FormCity;