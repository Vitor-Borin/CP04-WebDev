import { useState } from "react"
import { useNavigate } from "react-router"
import { PiMagnifyingGlass } from "react-icons/pi"

const SearchBar = () => {
    const [aviso, setAviso] = useState(false)
    const navigate = useNavigate()

    const sintonizar = (evento) => {
        evento.preventDefault()

        const termo = document.querySelector("#campo-busca").value
            .replaceAll("/", " ")
            .replaceAll("?", " ")
            .replaceAll("#", " ")
            .replaceAll("%", " ")
            .trim()

        if (termo.length < 2) {
            setAviso(true)
        } else {
            setAviso(false)
            navigate(`/busca/${termo}`)
        }
    }

    return (
        <form className="search" role="search" onSubmit={sintonizar}>
            <label htmlFor="campo-busca" className="sr-only">Buscar filme ou série</label>
            <PiMagnifyingGlass className="search-icon" aria-hidden="true" />
            <input id="campo-busca" type="search" placeholder="Sintonize um título" autoComplete="off" />
            <button type="submit" className="button">Sintonizar</button>

            {aviso && (
                <p className="search-warning" role="alert">
                    Sinal fraco. Digite pelo menos 2 letras para sintonizar.
                </p>
            )}
        </form>
    )
}

export default SearchBar
