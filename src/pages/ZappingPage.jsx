import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { gsap } from "gsap"
import TvScreen from "../components/TvScreen"
import Remote from "../components/Remote"
import SignalState from "../components/SignalState"

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_TMDB_KEY

const ZappingPage = () => {
    const params = useParams()
    const [canais] = useState(() => JSON.parse(localStorage.getItem("ondepassa:canais")) || [])
    const [tipo, setTipo] = useState("movie")
    const [titulos, setTitulos] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState(false)

    useEffect(() => {
        let ignorar = false

        const buscarCatalogo = async () => {
            setCarregando(true)
            setErro(false)

            try {
                const resposta = await fetch(`${API_URL}discover/${tipo}?api_key=${API_KEY}&language=pt-BR&with_watch_providers=${params.providerId}&watch_region=BR&with_watch_monetization_types=flatrate&sort_by=popularity.desc&include_adult=false`)
                const dados = await resposta.json()

                if (!ignorar) {
                    if (dados.success === false) {
                        setErro(true)
                    } else {
                        setTitulos(dados.results)
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

        buscarCatalogo()

        return () => {
            ignorar = true
        }
    }, [params.providerId, tipo])

    useEffect(() => {
        if (!document.querySelector(".tv-power")) {
            return
        }

        const mm = gsap.matchMedia()

        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.timeline()
                .fromTo(".tv-power", { autoAlpha: 1, scaleX: 0, scaleY: 0.006 }, { scaleX: 1, duration: 0.16, ease: "power2.out" })
                .to(".tv-power", { scaleY: 1, duration: 0.2, ease: "power3.in" })
                .fromTo(".tv-picture", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12 }, "-=0.04")
                .to(".tv-power", { autoAlpha: 0, duration: 0.14 }, "<")
        }, ".tv")

        return () => mm.revert()
    }, [])

    useEffect(() => {
        if (!document.querySelector(".tv-picture")) {
            return
        }

        const mm = gsap.matchMedia()

        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.timeline()
                .fromTo(".tv-picture", { y: -28, skewY: 2 }, { y: 0, skewY: 0, duration: 0.35, ease: "power3.out" })
                .fromTo(".tv-channel", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: "steps(3)" }, 0)
                .fromTo(".tv-osd-grande", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.18, ease: "steps(3)" }, 0.45)
                .to(".tv-osd-grande", { autoAlpha: 0, duration: 0.18, ease: "steps(3)" }, 1.2)
        }, ".tv")

        return () => mm.revert()
    }, [params.providerId])

    useEffect(() => {
        if (carregando || !document.querySelector(".tv-picture .poster-card-frame")) {
            return
        }

        const mm = gsap.matchMedia()

        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.timeline()
                .fromTo(".poster-card-frame", { autoAlpha: 0, scaleX: 0.04, scaleY: 0.02, filter: "brightness(3)" }, { autoAlpha: 1, scaleX: 1, duration: 0.16, stagger: 0.04, ease: "power2.out" })
                .to(".poster-card-frame", { scaleY: 1, filter: "brightness(1)", duration: 0.24, stagger: 0.04, ease: "power3.out", clearProps: "all" }, 0.1)
        }, ".tv-picture")

        return () => mm.revert()
    }, [carregando])

    const idsCanais = canais.map((canal) => canal.id)
    const indice = idsCanais.indexOf(Number(params.providerId))
    const canalAtual = canais[indice]
    const canalAnterior = indice <= 0 ? canais[canais.length - 1] : canais[indice - 1]
    const proximoCanal = indice === canais.length - 1 ? canais[0] : canais[indice + 1]

    if (canais.length === 0) {
        return (
            <section className="zapping-empty" data-osd="CH --">
                <h1 className="sr-only">Canal</h1>

                <div className="tv">
                    <SignalState
                        estado="vazio"
                        titulo="Sua TV ainda não tem canais."
                        texto="Escolha os streamings que você assina."
                        linkTexto="Escolher meus canais"
                        linkPara="/canais"
                    />
                </div>
            </section>
        )
    }

    return (
        <section className="zapping">
            <h1 className="sr-only">{canalAtual ? canalAtual.nome : "Canal"}</h1>

            <TvScreen
                numero={indice + 1}
                nomeCanal={canalAtual ? canalAtual.nome : "Fora do seu controle"}
                titulos={titulos}
                tipo={tipo}
                sintonizando={carregando}
                erro={erro}
            />

            <Remote
                canalAnterior={canalAnterior}
                proximoCanal={proximoCanal}
                tipo={tipo}
                setTipo={setTipo}
            />
        </section>
    )
}

export default ZappingPage
