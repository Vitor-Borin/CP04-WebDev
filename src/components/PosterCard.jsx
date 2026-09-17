import { Link } from "react-router"

const PosterCard = ({ id, tipo, titulo, ano, poster }) => {
    const tipoTexto = tipo === "filme" ? "Filme" : "Série"

    return (
        <article className="poster-card">
            <Link to={`/titulo/${tipo}/${id}`} className="poster-card-link">
                <div className="poster-card-frame">
                    {poster && (
                        <img src={`https://image.tmdb.org/t/p/w342${poster}`} alt={`Pôster de ${titulo}`} loading="lazy" />
                    )}

                    {!poster && (
                        <div className="poster-card-placeholder">
                            <div className="test-bars" aria-hidden="true"></div>
                            <span>{titulo}</span>
                        </div>
                    )}
                </div>

                <h3 className="poster-card-title">{titulo}</h3>
                <p className="poster-card-meta">{ano ? `${ano} · ${tipoTexto}` : tipoTexto}</p>
            </Link>
        </article>
    )
}

export default PosterCard
