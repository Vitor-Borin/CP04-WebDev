const ProviderGroup = ({ titulo, acesso, provedores, destaque }) => {
    return (
        <section className={`provider-group provider-group-${destaque}`}>
            <h3 className="provider-group-title">{titulo}</h3>

            <ul className="provider-rows">
                {provedores.map((provedor) => (
                    <li key={provedor.provider_id} className="provider-row">
                        <img src={`https://image.tmdb.org/t/p/w92${provedor.logo_path}`} alt="" loading="lazy" />
                        <span className="provider-row-name">{provedor.provider_name}</span>
                        <span className="provider-row-access">{destaque === "alto" ? "No seu controle" : acesso}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default ProviderGroup
