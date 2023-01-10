import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ToyFilter } from "../cmps/toy-filter"
import { ToyList } from "../cmps/toy-list"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"
import { store } from "../store/store"
import { loadToys, removeToy, saveToy, setFilter } from "../store/toy.action"
import { ToyDetails } from "./toy-details"

export function ToyIndex() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)

    const dispatch = useDispatch()

    useEffect(() => {
        loadToys(filterBy)
    }, [filterBy])

    // function onLoadToys(filterBy) {
    //     loadToys(filterBy)
    //         .then(() => {
    //         })
    //         .catch(err => {
    //             showErrorMsg('Cannot load toys')
    //         })
    // }

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

    function setFilterBy(filterBy){
        setFilter(filterBy)
    }




    return <section>
            <ToyFilter setFilterBy={setFilterBy} />

        <button onClick={onAddToy}>Add random toy</button>
        <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy} />
    </section>

}