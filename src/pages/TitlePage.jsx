import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { PiArrowLeft } from "react-icons/pi"
import ProviderGroup from "../components/ProviderGroup"
import SignalState from "../components/SignalState"

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_TMDB_KEY

const TitlePage = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [canais] = useState(() => JSON.parse(localStorage.getItem("ondepassa:canais")) || [])
    const [titulo, setTitulo] = useState({})
    const [ondeAssistir, setOndeAssistir] = useState({})
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState(false)

    let tipoApi = ""

    if (params.tipo === "filme") {
        tipoApi = "movie"
    }

    if (params.tipo === "serie") {
        tipoApi = "tv"
    }

    useEffect(() => {
        let ignorar = false

        const buscarTitulo = async () => {
            setCarregando(true)
            setErro(false)

            if (tipoApi === "") {
                setErro(true)
                setCarregando(false)
                return
            }

            try {
                const respostaTitulo = await fetch(`${API_URL}${tipoApi}/${params.id}?api_key=${API_KEY}&language=pt-BR`)
                const dadosTitulo = await respostaTitulo.json()

                const respostaProvedores = await fetch(`${API_URL}${tipoApi}/${params.id}/watch/providers?api_key=${API_KEY}`)
                const dadosProvedores = await respostaProvedores.json()

                if (!ignorar) {
                    if (dadosTitulo.success === false || dadosProvedores.success === false) {
                        setErro(true)
                    } else {
                        setTitulo(dadosTitulo)
                        setOndeAssistir(dadosProvedores.results.BR || {})
                    }
                    setCarregando(false)
                }
            } catch (falha) {
                console.log(falha)
                if (!ignorar) {
                    setErro(true)
                    setCarregando(false)
                }
            }
        }

        buscarTitulo()

        return () => {
            ignorar = true
        }
    }, [tipoApi, params.id])

    const nome = titulo.title || titulo.name || ""
    const ano = (titulo.release_date || titulo.first_air_date || "").slice(0, 4)
    const tipoTexto = tipoApi === "movie" ? "Filme" : "Série"
    const generos = (titulo.genres || []).map((genero) => genero.name).join(", ")
    const nota = titulo.vote_average ? titulo.vote_average.toFixed(1).replace(".", ",") : ""

    let duracao = ""

    if (titulo.runtime) {
        const horas = Math.floor(titulo.runtime / 60)
        const minutos = titulo.runtime % 60
        duracao = horas > 0 ? `${horas}h ${minutos}min` : `${minutos}min`
    }

    if (titulo.number_of_seasons) {
        duracao = titulo.number_of_seasons === 1 ? "1 temporada" : `${titulo.number_of_seasons} temporadas`
    }

    const detalhes = [ano, tipoTexto, duracao, generos].filter((item) => item !== "").join(" · ")

    const idsCanais = canais.map((canal) => canal.id)
    const assinaturas = ondeAssistir.flatrate || []
    const noSeuControle = assinaturas.filter((provedor) => idsCanais.includes(provedor.provider_id))
    const emOutrosCanais = assinaturas.filter((provedor) => !idsCanais.includes(provedor.provider_id))
    const aluguel = ondeAssistir.rent || []
    const compra = ondeAssistir.buy || []
    const semOndeAssistir = assinaturas.length === 0 && aluguel.length === 0 && compra.length === 0

    return (
        <section data-osd="INFO">
            <button type="button" className="back-button" onClick={() => navigate(-1)}>
                <PiArrowLeft aria-hidden="true" />
                Voltar
            </button>

            {carregando && (
                <div>
                    <div className="title-backdrop">
                        <div className="static" aria-hidden="true"></div>
                    </div>

                    <div className="title-layout">
                        <div className="title-poster">
                            <div className="static" aria-hidden="true"></div>
                        </div>

                        <div className="title-info">
                            <span className="loading-line loading-line-title"></span>
                            <span className="loading-line"></span>
                            <span className="loading-line loading-line-short"></span>
                        </div>

                        <div className="where">
                            <div className="where-loading">
                                <div className="static" aria-hidden="true"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!carregando && erro && (
                <div className="tv">
                    <SignalState
                        estado="erro"
                        titulo="Sem sinal."
                        texto="Não encontramos este título. Volte e tente outro."
                    />
                </div>
            )}

            {!carregando && !erro && (
                <article>
                    <div className="title-backdrop">
                        {titulo.backdrop_path && (
                            <img src={`https://image.tmdb.org/t/p/w1280${titulo.backdrop_path}`} alt="" />
                        )}
                    </div>

                    <div className="title-layout">
                        <div className="title-poster">
                            {titulo.poster_path && (
                                <img src={`https://image.tmdb.org/t/p/w342${titulo.poster_path}`} alt={`Pôster de ${nome}`} />
                            )}

                            {!titulo.poster_path && (
                                <div className="poster-card-placeholder">
                                    <div className="test-bars" aria-hidden="true"></div>
                                    <span>{nome}</span>
                                </div>
                            )}
                        </div>

                        <div className="title-info">
                            <h1 className="title-name">{nome}</h1>
                            <p className="title-details">{detalhes}</p>

                            {nota && (
                                <p className="title-score">
                                    <span className="label">Nota TMDB</span>
                                    {nota}
                                </p>
                            )}

                            {titulo.tagline && <p className="title-tagline">{titulo.tagline}</p>}

                            <p className="title-overview">
                                {titulo.overview || "Este título ainda não tem sinopse em português."}
                            </p>
                        </div>

                        <aside className="where" aria-labelledby="titulo-onde-passa">
                            <h2 id="titulo-onde-passa" className="where-title">Onde passa</h2>

                            {semOndeAssistir && (
                                <div className="tv">
                                    <SignalState
                                        estado="vazio"
                                        titulo="Este título não passa em nenhum canal no Brasil agora."
                                    />
                                </div>
                            )}

                            {!semOndeAssistir && (
                                <>
                                    {noSeuControle.length > 0 && (
                                        <ProviderGroup titulo="No seu controle" acesso="No seu controle" provedores={noSeuControle} destaque="alto" />
                                    )}

                                    {noSeuControle.length === 0 && (
                                        <p className="where-note">
                                            {canais.length === 0 ? "Você ainda não marcou os streamings que assina. " : "Nenhum dos seus canais tem este título agora. "}
                                            <Link to="/canais">{canais.length === 0 ? "Escolher meus canais" : "Editar meus canais"}</Link>
                                        </p>
                                    )}

                                    {emOutrosCanais.length > 0 && (
                                        <ProviderGroup titulo="Em outros canais" acesso="Incluso" provedores={emOutrosCanais} destaque="medio" />
                                    )}

                                    {aluguel.length > 0 && (
                                        <ProviderGroup titulo="Aluguel" acesso="Aluguel" provedores={aluguel} destaque="baixo" />
                                    )}

                                    {compra.length > 0 && (
                                        <ProviderGroup titulo="Compra" acesso="Compra" provedores={compra} destaque="baixo" />
                                    )}
                                </>
                            )}

                            <p className="where-credit">Dados de streaming: JustWatch</p>
                        </aside>
                    </div>
                </article>
            )}
        </section>
    )
}

export default TitlePage
