import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"

import Select from "react-select";




export function ToyFilter({ onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())
    const [selectedOptions, setSelectedOptions] = useState()

    onSetFilterBy = useRef(utilService.debounce(onSetFilterBy, 500))


    useEffect(() => {
        onSetFilterBy.current(filterByToEdit)
    }, [filterByToEdit])


    function handleChange({ target }) {
        let { value, name: field, type, checked } = target
        value = (type === 'number') ? +value : value
        value = (type === 'checkbox' && field === 'inStock') ? checked : value
        value = (type === 'checkbox' && field === 'desc') ? (checked ? -1 : 1) : value
        // value = (type === 'checkbox' && field === 'inStock') ? (checked ? true : false) : value
        setFilterByToEdit((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    function handleSelect(labels) {
        setSelectedOptions(labels)
        const labelsToSet = labels.length ? labels.map(i => i.value) : []
        console.log(labelsToSet)
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, label: labelsToSet }))
    }



    return <section className="toy-filter">
        <h2>Filter Them:</h2>
        <form className="filter-form">
            <div className="filter-container">
                <label htmlFor="name">By Name:
                    <input type="text"
                        id="name"
                        name="name"
                        placeholder="By Text"
                        value={filterByToEdit.name}
                        onChange={handleChange} />
                </label>
                <label htmlFor="inStock">In Stock:
                    <input type="checkbox" name="inStock" id="inStock" onChange={handleChange} value={filterByToEdit.inStock} />
                </label>

                <Select
                    option={toyService.getToyLabels().map((label) => ({ value: label, label }))}
                    placeholder="Select labels"
                    value={selectedOptions}
                    onChange={handleSelect}
                    isMulti={true}
                />
            </div>
            <hr />
            <h2>Sort Them:</h2>
            <div className="sort-container">
                <label htmlFor="sort">Sort By:
                    <select name="sortBy" id="sort" onChange={handleChange} value={filterByToEdit.sortBy}>
                        <option value="">Choose</option>
                        <option value="name">Name</option>
                        <option value="created">Created At</option>
                        <option value="price">Price</option>
                    </select>
                </label>
                <label htmlFor="desc">Descending:
                    <input type="checkbox" name="desc" id="desc" value={filterByToEdit.desc} onChange={handleChange} />
                </label>
            </div>

        </form>

    </section>
}