const traducoes = {
    // Idiomas
    "English": "Inglês",
    "Spanish": "Espanhol",
    "Portuguese": "Português",
    "French": "Francês",
    "German": "Alemão",
    "Italian": "Italiano",
    "Russian": "Russo",
    "Chinese": "Chinês",
    "Japanese": "Japonês",
    "Korean": "Coreano",
    "Arabic": "Árabe",
    "Hindi": "Hindi",
    "Dutch": "Holandês",
    "Turkish": "Turco",
    "Swedish": "Sueco",
    "Norwegian": "Norueguês",
    "Danish": "Dinamarquês",
    "Finnish": "Finlandês",
    "Greek": "Grego",
    "Polish": "Polonês",
    "Hebrew": "Hebraico",
    "Ukrainian": "Ucraniano",
    "Czech": "Tcheco",
    "Hungarian": "Húngaro",
    "Romanian": "Romeno",
    "Vietnamese": "Vietnamita",
    "Thai": "Tailandês",
    "Bengali": "Bengali",
    "Persian": "Persa",
    "Indonesian": "Indonésio",
    "Malay": "Malaio",
    "Swahili": "Suaíli",
    "Afrikaans": "Africâner",
    
    // Moedas
    "United States dollar": "Dólar Americano",
    "Euro": "Euro",
    "Brazilian real": "Real Brasileiro",
    "Japanese yen": "Iene Japonês",
    "Chinese yuan": "Yuan Chinês",
    "Pound sterling": "Libra Esterlina",
    "Canadian dollar": "Dólar Canadense",
    "Australian dollar": "Dólar Australiano",
    "Swiss franc": "Franco Suíço",
    "Russian ruble": "Rublo Russo",
    "Indian rupee": "Rúpia Indiana",
    "South Korean won": "Won Sul-coreano",
    "Mexican peso": "Peso Mexicano",
    "Argentine peso": "Peso Argentino",
    "South African rand": "Rand Sul-africano",
    "Turkish lira": "Lira Turca",
    "Swedish krona": "Coroa Sueca",
    "Norwegian krone": "Coroa Norueguesa",
    "Danish krone": "Coroa Dinamarquesa",
    "New Zealand dollar": "Dólar Neozelandês",
    "Singapore dollar": "Dólar de Singapura",
    "Hong Kong dollar": "Dólar de Hong Kong",
    "Polish złoty": "Złoty Polonês",
    "Israeli new shekel": "Novo Shekel Israelense",
    "Saudi riyal": "Rial Saudita",
    "Emirati dirham": "Dirham dos Emirados",
    "Chilean peso": "Peso Chileno",
    "Colombian peso": "Peso Colombiano"
};

export const traduzir = (termo: string | null | undefined): string => {
    if (!termo) {
        return 'N/D';
    }
    
    const dicionario = traducoes as { [key: string]: string };
    
    return dicionario[termo] || termo;
};