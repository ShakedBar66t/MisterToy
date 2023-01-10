import { Link } from "react-router-dom"
import { ToyPreview } from "./toy-preview"

export function ToyList({ toys, onRemoveToy}) {

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview
                        toy={toy}
                        onRemoveToy={onRemoveToy} />
                </li>)}

        </ul>
    )
}