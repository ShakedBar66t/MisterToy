import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ToyFilter } from "../cmps/toy-filter"
import { ToyList } from "../cmps/toy-list"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"
import { loadToys, removeToy, saveToy } from "../store/toy.action"
import { ToyDetails } from "./toy-details"

export function ToyIndex() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)
    console.log('toys from toyindex', toys)

    const dispatch = useDispatch()

    useEffect(() => {
        onLoadToys()
    }, [])

    function onLoadToys(filterBy) {
        loadToys(filterBy)
            .then(() => {
            })
            .catch(err => {
                showErrorMsg('Cannot load toys')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getRandomToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                console.log(`Toy added: (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    // function setFilterBy(filterBy){
    //     setFilter(filterBy)
    // }




    return <section>
        <ToyFilter />

        <button onClick={onAddToy}>Add random toy</button>
        <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy} />
    </section>

}