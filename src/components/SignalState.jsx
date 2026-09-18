import { Link } from "react-router"

const SignalState = ({ estado, titulo, texto, linkTexto, linkPara }) => {
    return (
        <div className={`signal signal-${estado}`} role={estado === "erro" ? "alert" : "status"}>
            {estado === "vazio" && <div className="test-bars" aria-hidden="true"></div>}

            <div className="signal-slate">
                <h2 className="signal-title">{titulo}</h2>
                {texto && <p className="signal-text">{texto}</p>}
                {linkPara && <Link to={linkPara} className="button">{linkTexto}</Link>}
            </div>
        </div>
    )
}

export default SignalState
