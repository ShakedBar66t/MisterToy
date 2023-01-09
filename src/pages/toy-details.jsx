
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toyService } from "../services/toy.service";

export function ToyDetails() {
    const { toyId } = useParams()
    const [toy, setToy] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        loadToys()
    }, [toyId])

    function loadToys() {
        toyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details')
                navigate('/toy')
            })
    }

    function getImportDate(timestamp) {
        const date = new Date(timestamp)
        const day = date.getDay()
        const month = date.getMonth()
        const year = date.getFullYear()
        return (`${day + 1}/${month +1}/${year}`)
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <section className="toy-content">
                <img src={toy.src} />
                <h2>Toy: {toy.name}</h2>
                <h1>Date added: {getImportDate(toy.createdAt)}</h1>
                <h1>Price: <span>{toy.price}$</span></h1>
                <h1 className={(toy.inStock) ? 'green' : 'red'}>{(toy.inStock) ? 'In Stock' : 'Not in stock'}</h1>
                <h1></h1>
                <Link to={'/toy'}>
                    <button>Close</button>
                </Link>
            </section>

        </section>

    )
}