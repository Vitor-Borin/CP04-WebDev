import logo from "../assets/logo.svg"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <img src={logo} alt="Onde Passa" className="footer-logo" />

                <div className="footer-credits">
                    <p className="footer-justwatch">Dados de streaming: JustWatch</p>
                    <p>Este produto usa a API do TMDB, mas não é endossado nem certificado pelo TMDB.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
