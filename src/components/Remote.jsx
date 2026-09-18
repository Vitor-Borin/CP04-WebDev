import { Link } from "react-router"
import { PiCaretDown, PiCaretUp } from "react-icons/pi"
import logo from "../assets/logo.svg"

const Remote = ({ canalAnterior, proximoCanal, tipo, setTipo }) => {
    return (
        <aside className="remote" aria-label="Controle remoto">
            <div className="remote-top">
                <span className="remote-led" aria-hidden="true"></span>
                <img src={logo} alt="" className="remote-brand" />
            </div>

            <div className="remote-channels">
                <Link
                    to={`/canal/${proximoCanal.id}`}
                    className="remote-button remote-next"
                    aria-label={`Próximo canal: ${proximoCanal.nome}`}
                >
                    <PiCaretUp aria-hidden="true" />
                    CH+
                </Link>

                <Link
                    to={`/canal/${canalAnterior.id}`}
                    className="remote-button remote-previous"
                    aria-label={`Canal anterior: ${canalAnterior.nome}`}
                >
                    CH-
                    <PiCaretDown aria-hidden="true" />
                </Link>
            </div>

            <div className="remote-type" role="group" aria-label="Tipo de catálogo">
                <button
                    type="button"
                    className={tipo === "movie" ? "remote-type-on" : ""}
                    aria-pressed={tipo === "movie"}
                    onClick={() => setTipo("movie")}
                >
                    Filmes
                </button>
                <button
                    type="button"
                    className={tipo === "tv" ? "remote-type-on" : ""}
                    aria-pressed={tipo === "tv"}
                    onClick={() => setTipo("tv")}
                >
                    Séries
                </button>
            </div>
        </aside>
    )
}

export default Remote
