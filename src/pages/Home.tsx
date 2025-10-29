import { Link } from "react-router-dom";
import Card from "../components/Card/Card";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import "../index.css";

const Home = () => {
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="main-content">
                <h1 className="title">Explore o mundo com Geopedia</h1>
                <p className="introduction">
                    Geopedia é sua plataforma administrar e explorar continentes, cidades e países. Nosso CRUD intuitivo
                    torna fácil adicionar, editar, visualizar e excluir informações geográficas de forma eficiente. Seja você um entusiasta de
                    geografia, estudante ou profissional.
                </p>
            </div>
            <div className="sub-content">
                <h1>Administre informações geográficas com facilidade</h1>
                <p>
                    Com nosso sistema CRUD completo, você pode adicionar novos registros,
                    editar detalhes existentes, visualizar informações e excluir dados desnecessários com
                    facilidade. Nossa plataforma é projetada para simplificar a gestão de informações geográficas, tornando
                    o processo eficiente e acessível para todos os usuários.
                </p>
            </div>
            <div className="card-div">
                <Link to="/cidades">
                    <Card title="Cidades" desc="Adicionar, visualizar, atualizar e excluir informações sobre cidades." />
                </Link>
                <Link to="/paises">
                    <Card title="Países" desc="Administre informações como capital, população e área." />
                </Link>
                <Link to="/continentes">
                    <Card title="Continentes" desc="Organize continentes e visualize seus países e informações geográficas." />
                </Link>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default Home;