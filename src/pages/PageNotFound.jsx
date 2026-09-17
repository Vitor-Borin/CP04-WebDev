import { Link } from "react-router"

const PageNotFound = () => {
    return (
        <section className="off-air" data-osd="CH --">
            <div className="tv off-air-tv">
                <div className="tv-screen">
                    <div className="test-bars" aria-hidden="true"></div>
                    <p className="tv-osd off-air-osd" aria-hidden="true">CH --</p>

                    <div className="off-air-slate">
                        <h1>Fora do ar</h1>
                        <p>Este canal não existe. Volte para o início e sintonize de novo.</p>
                        <Link to="/" className="button">Voltar ao início</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PageNotFound
