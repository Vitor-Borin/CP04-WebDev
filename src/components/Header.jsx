import { Link } from "react-router"
import { PiTelevisionSimpleFill } from "react-icons/pi"

const Header = () => {
    return (
        <header className="header">
            <div className="header-inner">
                <Link to="/" className="logo">
                    <PiTelevisionSimpleFill className="logo-icon" aria-hidden="true" />
                    Onde Passa
                </Link>

                <nav className="nav" aria-label="Menu principal">
                    <Link to="/">Início</Link>
                    <Link to="/canais">Meus canais</Link>
                </nav>
            </div>
        </header>
    )
}

export default Header
