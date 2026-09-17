import { Link } from "react-router"

const SignalState = ({ estado, mensagem, linkTexto, linkPara }) => {
    const ponto = mensagem.indexOf(". ")
    const titulo = ponto === -1 ? mensagem : mensagem.slice(0, ponto + 1)
    const texto = ponto === -1 ? "" : mensagem.slice(ponto + 2)

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
