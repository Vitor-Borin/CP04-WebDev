import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { PiPower } from "react-icons/pi"
import ProviderCard from "../components/ProviderCard"
import SignalState from "../components/SignalState"

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_TMDB_KEY

const ChannelsPage = () => {
    const [canais, setCanais] = useState(() => JSON.parse(localStorage.getItem("ondepassa:canais")) || [])
    const [provedores, setProvedores] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const buscarStreamings = async () => {
            try {
                const resposta = await fetch(`${API_URL}watch/providers/movie?api_key=${API_KEY}&language=pt-BR&watch_region=BR`)
                const dados = await resposta.json()

                if (dados.success === false) {
                    setErro(true)
                } else {
                    const ordenados = [...dados.results].sort((a, b) => (a.display_priorities.BR ?? 999) - (b.display_priorities.BR ?? 999))
                    setProvedores(ordenados.slice(0, 20))
                }
            } catch (falha) {
                console.log(falha)
                setErro(true)
            }

            setCarregando(false)
        }

        buscarStreamings()
    }, [])

    useEffect(() => {
        localStorage.setItem("ondepassa:canais", JSON.stringify(canais))
    }, [canais])

    const idsCanais = canais.map((canal) => canal.id)

    const alternarCanal = (provedor) => {
        if (idsCanais.includes(provedor.provider_id)) {
            setCanais(canais.filter((canal) => canal.id !== provedor.provider_id))
        } else {
            setCanais([...canais, { id: provedor.provider_id, nome: provedor.provider_name, logo: provedor.logo_path }])
        }
    }

    const ligarTv = () => {
        navigate(`/canal/${canais[0].id}`)
    }

    const contador = canais.length === 1 ? "1 canal sintonizado" : `${canais.length} canais sintonizados`

    return (
        <section data-osd="MENU">
            <div className="channels-top">
                <div>
                    <h1 className="page-title">Meus canais</h1>
                    <p className="page-lead">
                        Marque os streamings que você assina. A ordem em que você marca vira a ordem dos canais no controle.
                    </p>
                </div>

                <div className="channels-panel">
                    <p className="counter" aria-live="polite">{contador}</p>
                    <button type="button" className="button" disabled={canais.length === 0} onClick={ligarTv}>
                        <PiPower aria-hidden="true" />
                        Ligar a TV
                    </button>
                </div>
            </div>

            {carregando && (
                <div className="provider-grid">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((bloco) => (
                        <div className="provider-card provider-card-loading" key={bloco}>
                            <div className="static" aria-hidden="true"></div>
                        </div>
                    ))}
                </div>
            )}

            {!carregando && erro && (
                <div className="tv">
                    <SignalState
                        estado="erro"
                        titulo="Sem sinal."
                        texto="Não conseguimos carregar os streamings. Verifique sua conexão e tente de novo."
                    />
                </div>
            )}

            {!carregando && !erro && provedores.length === 0 && (
                <div className="tv">
                    <SignalState
                        estado="vazio"
                        titulo="Nenhum streaming encontrado para o Brasil."
                        texto="Tente de novo mais tarde."
                    />
                </div>
            )}

            {!carregando && !erro && provedores.length > 0 && (
                <ul className="provider-grid">
                    {provedores.map((provedor) => (
                        <li key={provedor.provider_id}>
                            <ProviderCard
                                provedor={provedor}
                                numero={idsCanais.indexOf(provedor.provider_id) + 1}
                                aoClicar={alternarCanal}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}

export default ChannelsPage
