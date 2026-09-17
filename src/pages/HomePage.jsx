import { useEffect, useState } from "react"
import { Link } from "react-router"
import { gsap } from "gsap"
import { PiPower } from "react-icons/pi"

const HomePage = () => {
    const [canais] = useState(() => JSON.parse(localStorage.getItem("ondepassa:canais")) || [])

    useEffect(() => {
        const mm = gsap.matchMedia()

        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.timeline()
                .fromTo(".tv-power", { autoAlpha: 1, scaleX: 0, scaleY: 0.006 }, { scaleX: 1, duration: 0.16, ease: "power2.out" })
                .to(".tv-power", { scaleY: 1, duration: 0.2, ease: "power3.in" })
                .fromTo(".home-picture", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12 }, "-=0.04")
                .to(".tv-power", { autoAlpha: 0, duration: 0.14 }, "<")
        }, ".home")

        return () => mm.revert()
    }, [])

    return (
        <section className="home" data-osd="CH 00">
            <div className="tv home-tv">
                <div className="tv-screen">
                    <div className="home-picture">
                        <p className="tv-osd">
                            <span className="tv-channel-number">CH 00</span> · Onde Passa
                        </p>

                        <h1 className="home-title">Seus streamings viraram canais</h1>

                        <p className="home-lead">
                            Marque o que você assina, zapeie pelo catálogo de cada um e busque um título para saber se ele
                            está no seu controle ou se vai precisar alugar.
                        </p>

                        {canais.length > 0 && (
                            <Link to={`/canal/${canais[0].id}`} className="button">
                                <PiPower aria-hidden="true" />
                                Ligar a TV
                            </Link>
                        )}

                        {canais.length === 0 && (
                            <Link to="/canais" className="button">
                                Escolher meus canais
                            </Link>
                        )}
                    </div>

                    <div className="tv-power" aria-hidden="true"></div>
                </div>
            </div>

            <aside className="guide" aria-labelledby="titulo-grade">
                <div className="remote-top">
                    <span className="remote-led" aria-hidden="true"></span>
                    <span className="remote-brand">Onde Passa</span>
                </div>

                <h2 id="titulo-grade" className="label">Sua grade</h2>

                {canais.length === 0 && (
                    <p className="guide-empty">
                        Sua grade ainda está vazia. Os streamings que você marcar aparecem aqui, na ordem dos canais.
                    </p>
                )}

                {canais.length > 0 && (
                    <>
                        <ol className="lineup">
                            {canais.map((canal, indice) => (
                                <li key={canal.id}>
                                    <Link to={`/canal/${canal.id}`} className="lineup-item" data-cor={indice % 7 + 1}>
                                        <span className="lineup-number">CH {String(indice + 1).padStart(2, "0")}</span>
                                        <img src={`https://image.tmdb.org/t/p/w92${canal.logo}`} alt="" />
                                        <span className="lineup-name">{canal.nome}</span>
                                    </Link>
                                </li>
                            ))}
                        </ol>

                        <Link to="/canais" className="button button-ghost">
                            Editar canais
                        </Link>
                    </>
                )}
            </aside>
        </section>
    )
}

export default HomePage
