import { Link } from "react-router-dom"

export function ToyPreview({ toy, onRemoveToy, onEditToy }) {

    return (
        <article className="toy-preview">
            <img src={toy.src} />
            <Link to={`/toy/details/${toy._id}`}>
                <h1>{toy.name}</h1>
            </Link>
            <h2>{toy.price}$</h2>
            <h1 className={(toy.inStock) ? 'green' : 'red'}>{(toy.inStock) ? 'In Stock' : 'Not in stock'}</h1>
            <div>
                <button onClick={() => { onRemoveToy(toy._id) }}>Remove</button>
                <Link to={`/toy/edit/${toy._id}`}>
                    <button>Edit</button>
                </Link>
            </div>
        </article>
    )
}