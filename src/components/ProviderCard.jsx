const ProviderCard = ({ provedor, numero, aoClicar }) => {
    const selecionado = numero > 0
    const canal = String(numero).padStart(2, "0")

    return (
        <button
            type="button"
            className={selecionado ? "provider-card provider-card-on" : "provider-card"}
            aria-pressed={selecionado}
            onClick={() => aoClicar(provedor)}
        >
            <span className="provider-card-channel">{selecionado ? `CH ${canal}` : "CH --"}</span>
            <img
                className="provider-card-logo"
                src={`https://image.tmdb.org/t/p/w92${provedor.logo_path}`}
                alt=""
                loading="lazy"
            />
            <span className="provider-card-name">{provedor.provider_name}</span>
        </button>
    )
}

export default ProviderCard
