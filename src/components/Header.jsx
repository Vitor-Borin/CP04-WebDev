import { Link } from "react-router"
import logo from "../assets/logo.svg"
import SearchBar from "./SearchBar"

const Header = () => {
    return (
        <header className="header">
            <div className="header-inner">
                <Link to="/" className="logo">
                    <img src={logo} alt="" className="logo-icon" />
                    Onde Passa
                </Link>

                <nav className="nav" aria-label="Menu principal">
                    <Link to="/">Início</Link>
                    <Link to="/canais">Meus canais</Link>
                </nav>

                <SearchBar />
            </div>
        </header>
    )
}

export default Header
