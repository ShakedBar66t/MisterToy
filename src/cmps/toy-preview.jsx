
export function ToyPreview({ toy }) {

    return (
        <article>
            <img src={toy.src} />
            <h1>{toy.name}</h1>
            <h2>{toy.price}$</h2>
        </article>
    )
}