import { Link } from "react-router-dom"

export function ToyPreview({ toy, onRemoveToy, onEditToy }) {

    return (
        <article className="toy-preview">
            <img src={toy.src} />
            <h1>{toy.name}</h1>
            <h2>{toy.price}$</h2>
            <div>
                <button onClick={() => { onRemoveToy(toy._id) }}>Remove</button>
                <Link to={`/toy/edit/${toy._id}`}>
                    <button>Edit</button>
                </Link>
            </div>
        </article>
    )
}