import { ToyPreview } from "./toy-preview"

export function ToyList({toys}) {
    console.log('toys', toys)

    return (
        <ul className="toy-list">
            {toys.map(toy => 
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy}/>
                </li>)}
            
        </ul>
        )
}