import { useEffect, useMemo, useState } from "react";
import { traduzir } from "../../utils/translations";
import type { Continente, Pais } from "../../types";

interface CountryDetailsProps {
    pais: Pais;
    onClose: () => void;
    continentes: Continente[];
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ pais, onClose, continentes }) => {
    // const [isLoading, setIsLoading] = useState(null);

    const continenteNome = useMemo(() => {
        return continentes.find(c => c.id === pais.id_continente)?.nome;
    }, [pais, continentes]);

    return (
        <div className="side-modal-overlay" onClick={onClose}>
            <div className="side-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="side-modal-close" onClick={onClose}>&times;</button>

                <h2>{pais.nome}</h2>

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