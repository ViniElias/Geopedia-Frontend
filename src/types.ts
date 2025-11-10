export interface Continente {
    id: number;
    nome: string;
    descricao: string;
}

export interface Pais {
    id: number;
    nome: string;
    populacao: number;
    idioma: string;
    moeda: string;
    id_continente: number;
}

export type SortKeyContinente = 'nome' | 'descricao';
export type SortKeyCountry = 'nome' | 'populacao' | 'idioma' | 'moeda';
export type SortDirection = 'asc' | 'desc';