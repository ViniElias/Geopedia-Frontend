export interface Continente {
    id: number;
    nome: string;
    descricao: string;
}

export interface Pais {
    id: number;
    nome: string;
    populacao: number | null;
    idioma: string | null;
    moeda: string | null;
    id_continente: number | null;
}

export interface Cidade {
    id: number;
    nome: string;
    populacao: number;
    latitude: number;
    longitude: number;
    id_pais: number;
}

export interface WeatherInfo {
    icone: string;
    clima: string;
    temperatura: number;
    umidade: number;
    vento: number;
    horario: string;
}

export type SortKeyContinente = 'nome' | 'descricao';
export type SortKeyCountry = 'nome' | 'populacao' | 'idioma' | 'moeda';
export type SortKeyCity = 'nome' | 'populacao' | 'latitude' | 'longitude';
export type SortDirection = 'asc' | 'desc';