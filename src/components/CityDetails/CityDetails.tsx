import React, { useState, useEffect, useMemo } from 'react';
import type { Cidade, WeatherInfo, Pais } from '../../types';
import './CityDetails.css';

interface CityDetailsProps {
    cidade: Cidade;
    onClose: () => void;
    paises: Pais[];
}

const CityDetails: React.FC<CityDetailsProps> = ({ cidade, onClose, paises }) => {
    const [weather, setWeather] = useState<WeatherInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            if (!cidade) return;
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:3001/cidades/${cidade.id}/clima`);
                if (!response.ok) throw new Error('Falha ao buscar clima.');
                const data: WeatherInfo = await response.json();
                setWeather(data);
            } catch (error) {
                console.error("Erro ao buscar clima:", error);
                setWeather(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWeather();
    }, [cidade]);

    // Helper para formatar data/hora
    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('pt-BR', {
            hour: '2-digit', minute: '2-digit'
        });
    };

    const paisNome = useMemo(() => {
        return paises.find(p => p.id === cidade.id_pais)?.nome;
    }, [cidade, paises]);

    return (
        <div className="side-modal-overlay" onClick={onClose}>
            <div className="side-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="side-modal-close" onClick={onClose}>&times;</button>

                <h2>{cidade.nome}</h2>

                <div className="details-section">
                    <h3>Informações</h3>
                    <ul>
                        <li><strong>População:</strong> {cidade.populacao}</li>
                        <li><strong>Latitude:</strong> {cidade.latitude}</li>
                        <li><strong>Longitude:</strong> {cidade.longitude}</li>
                        <li><strong>País:</strong> {paisNome || 'N/D'}</li>
                    </ul>
                </div>

                <div className="details-section">
                    <h3>Clima Atual</h3>
                    {isLoading ? (
                        <p>Carregando clima...</p>
                    ) : weather ? (
                        <div className="weather-card">
                            <img
                                src={`http://openweathermap.org/img/wn/${weather.icone}@2x.png`}
                                alt={weather.clima}
                                className="weather-icon"
                            />
                            <div className="weather-temp">{Math.round(weather.temperatura)}°C</div>
                            <div className="weather-desc">{weather.clima}</div>
                            <div className="weather-details">
                                <span>Umidade: {weather.umidade}%</span>
                                <span>Vento: {weather.vento.toFixed(1)} m/s</span>
                            </div>
                            <small>Atualizado às {formatTime(weather.horario)}</small>
                        </div>
                    ) : (
                        <p>Não foi possível carregar o clima.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CityDetails;