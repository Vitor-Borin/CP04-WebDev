import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { gsap } from "gsap"
import PosterCard from "../components/PosterCard"
import SignalState from "../components/SignalState"

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_TMDB_KEY

const SearchPage = () => {
    const params = useParams()
    const [resultados, setResultados] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState(false)

    useEffect(() => {
        let ignorar = false

        const buscarResultados = async () => {
            setCarregando(true)
            setErro(false)

            try {
                const resposta = await fetch(`${API_URL}search/multi?api_key=${API_KEY}&language=pt-BR&query=${params.termo.replaceAll("&", " ")}&include_adult=false`)
                const dados = await resposta.json()

                if (!ignorar) {
                    if (dados.success === false) {
                        setErro(true)
                    } else {
                        setResultados(dados.results.filter((resultado) => resultado.media_type !== "person"))
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

        buscarResultados()

        return () => {
            ignorar = true
        }
    }, [params.termo])

    useEffect(() => {
        if (carregando || !document.querySelector(".results .poster-card-frame")) {
            return
        }

        const mm = gsap.matchMedia()

        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.timeline()
                .fromTo(".poster-card-frame", { autoAlpha: 0, scaleX: 0.04, scaleY: 0.02, filter: "brightness(3)" }, { autoAlpha: 1, scaleX: 1, duration: 0.16, stagger: 0.04, ease: "power2.out" })
                .to(".poster-card-frame", { scaleY: 1, filter: "brightness(1)", duration: 0.24, stagger: 0.04, ease: "power3.out", clearProps: "all" }, 0.1)
        }, ".results")

        return () => mm.revert()
    }, [carregando])

    const contador = resultados.length === 1 ? "1 resultado" : `${resultados.length} resultados`

    return (
        <section className="results" data-osd="BUSCA">
            <div className="results-top">
                <div>
                    <p className="label">Busca</p>
                    <h1 className="page-title results-title">“{params.termo}”</h1>
                </div>

                {!carregando && !erro && resultados.length > 0 && (
                    <p className="counter">{contador}</p>
                )}
            </div>

            {carregando && (
                <ul className="poster-grid" aria-label="Carregando resultados">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((bloco) => (
                        <li key={bloco} className="poster-card-loading">
                            <div className="poster-card-frame">
                                <div className="static" aria-hidden="true"></div>
                            </div>
                            <span className="loading-line"></span>
                            <span className="loading-line loading-line-short"></span>
                        </li>
                    ))}
                </ul>
            )}

            {!carregando && erro && (
                <div className="tv">
                    <SignalState
                        estado="erro"
                        mensagem="Sem sinal. A busca não respondeu. Tente de novo em instantes."
                    />
                </div>
            )}

            {!carregando && !erro && resultados.length === 0 && (
                <div className="tv">
                    <SignalState
                        estado="vazio"
                        mensagem={`Nada passando com o nome "${params.termo}". Confira a grafia ou tente o título original.`}
                    />
                </div>
            )}

            {!carregando && !erro && resultados.length > 0 && (
                <ul className="poster-grid">
                    {resultados.map((resultado) => (
                        <li key={`${resultado.media_type}-${resultado.id}`}>
                            <PosterCard
                                id={resultado.id}
                                tipo={resultado.media_type === "movie" ? "filme" : "serie"}
                                titulo={resultado.title || resultado.name}
                                ano={(resultado.release_date || resultado.first_air_date || "").slice(0, 4)}
                                poster={resultado.poster_path}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}

export default SearchPage
