import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <p>&copy; 2025 - Geopedia - Todos os direitos reservados.</p>
            <div className="footer-icons">
                <a href="https://www.linkedin.com/in/vinicius-elias-895332235/" target="blank">
                    <i className="devicon-linkedin-plain"></i>
                </a>
                <a href="https://github.com/ViniElias" target="blank">
                    <i className="devicon-github-original"></i>
                </a>
            </div>
        </div>
    )
}

export default Footer;