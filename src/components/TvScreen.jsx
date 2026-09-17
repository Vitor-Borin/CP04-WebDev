import PosterCard from "./PosterCard"
import SignalState from "./SignalState"

const TvScreen = ({ numero, nomeCanal, titulos, tipo, sintonizando, erro }) => {
    const canal = numero > 0 ? String(numero).padStart(2, "0") : "--"
    const tipoRota = tipo === "movie" ? "filme" : "serie"

    return (
        <div className={sintonizando ? "tv tv-large tv-tuning" : "tv tv-large"} data-cor={(numero - 1) % 7 + 1}>
            <div className="tv-screen">
                <p className="tv-osd tv-channel" aria-live="polite">
                    <span className="tv-channel-number">CH {canal}</span> · {nomeCanal}
                </p>
                <p className="tv-osd tv-type">{tipo === "movie" ? "Filmes" : "Séries"}</p>

                {!sintonizando && erro && (
                    <SignalState
                        estado="erro"
                        mensagem="Sem sinal. Não conseguimos carregar este canal. Tente trocar de canal ou recarregar."
                    />
                )}

                {!sintonizando && !erro && titulos.length === 0 && (
                    <SignalState
                        estado="vazio"
                        mensagem="Nada passando neste canal agora. Troque de canal no controle."
                    />
                )}

                <div className="tv-picture">
                    {!erro && titulos.length > 0 && (
                        <ul className="poster-grid">
                            {titulos.map((tituloAtual) => (
                                <li key={tituloAtual.id}>
                                    <PosterCard
                                        id={tituloAtual.id}
                                        tipo={tipoRota}
                                        titulo={tituloAtual.title || tituloAtual.name}
                                        ano={(tituloAtual.release_date || tituloAtual.first_air_date || "").slice(0, 4)}
                                        poster={tituloAtual.poster_path}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="static tv-static" aria-hidden="true"></div>
                <div className="tv-power" aria-hidden="true"></div>
            </div>
        </div>
    )
}

export default TvScreen
