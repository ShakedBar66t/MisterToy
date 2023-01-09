import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toyService } from "../services/toy.service.js";
import { saveToy } from "../store/toy.action.js"

export function ToyEdit() {
    const navigate = useNavigate()
    const params = useParams()
    const { toyId } = params
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    console.log(toyToEdit)

    useEffect(() => {
        toyService.getById(toyId)
            .then((toy) => setToyToEdit(toy))
    }, [params.toyId])

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then((savedToy) => {
                console.log('toy updated successfully!')
                navigate('/toy')

            })
            .catch(err => {
                console.log('Cannot update toy')
                navigate('/toy')

            })
    }

    function handleEditChange({ target }) {
        let { value, name: field } = target
        const toy = { ...toyToEdit }
        toy[field] = value
        setToyToEdit(toy)
    }


    return (
        <section className="toy-edit">
            <h1>Edit toy!</h1>
            <form className="toy-form" onSubmit={onSaveToy}>
                <input className="toy-input"
                    value={toyToEdit.name}
                    type="text"
                    name="name"
                    placeholder="Toy name.."
                    onChange={handleEditChange}
                />
                <button type="submit" className="close-btn">Close</button>
            </form>
        </section>
    )
}