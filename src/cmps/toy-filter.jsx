import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"


export function ToyFilter({ setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())


    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])


    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }



    return <section className="toy-filter full main-layout">
        <h2>Toy Filter</h2>
        <input
            type="text"
            id="txt"
            name="txt"
            placeholder="By toy name"
            value={filterByToEdit.txt}
            onChange={handleChange}
        />
    </section>
}