import { useEffect, useMemo, useState } from "react";
import { traduzir } from "../../utils/translations";
import type { Continente, Pais } from "../../types";
import './CountryDetails.css';

interface CountryDetailsProps {
    pais: Pais;
    onClose: () => void;
    continentes: Continente[];
};

interface RestCountryResponse {
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
};

const CountryDetails: React.FC<CountryDetailsProps> = ({ pais, onClose, continentes }) => {
    const [flagUrl, setFlagUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const continenteNome = useMemo(() => {
        return continentes.find(c => c.id === pais.id_continente)?.nome;
    }, [pais, continentes]);

    useEffect(() => {
        const fetchflag = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://restcountries.com/v3.1/translation/${pais.nome}`);

                if (!response.ok) throw new Error("Erro ao buscar bandeira.");

                const data = await response.json() as RestCountryResponse[];

                if (data && data.length > 0) {
                    setFlagUrl(data[0].flags.png)
                }
            } catch (error) {
                console.error("Erro ao buscar bandeira: ", error);
                setFlagUrl(null);
            } finally {
                setIsLoading(false);
            };
        };

        fetchflag();
    }, [pais]);

    return (
        <div className="side-modal-overlay" onClick={onClose}>
            <div className="side-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="side-modal-close" onClick={onClose}>&times;</button>

                <h2>{pais.nome}</h2>

                <div className="details-section">
                    <h3>Bandeira Nacional</h3>
                    <div className="flag-container">
                        {isLoading ? (
                            <p>Carregando bandeira...</p>
                        ) : flagUrl ? (
                            <>
                                <img src={flagUrl} className="country-flag" />
                            </>
                        ) : (
                            <p>Bandeira não disponível.</p>
                        )}
                    </div>
                </div>

                <div className="details-section">
                    <h3>Informações</h3>
                    <ul>
                        <li><strong>População:</strong> {pais.populacao} pessoas</li>
                        <li><strong>Idioma:</strong> {traduzir(pais.idioma)}</li>
                        <li><strong>Moeda:</strong> {traduzir(pais.moeda)}</li>
                        <li><strong>Continente:</strong> {continenteNome || 'N/D'}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CountryDetails;