import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ToyFilter } from "../cmps/toy-filter"
import { ToyList } from "../cmps/toy-list"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"
import { store } from "../store/store"
import { filterToys, loadToys, removeToy, saveToy, setFilter } from "../store/toy.action"
import { ToyDetails } from "./toy-details"

export function ToyIndex() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)

    useEffect(() => {
        loadToys(filterBy)
    }, [filterBy])
    

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

    function onSetFilterBy(filterBy){
        filterToys(filterBy)
    }




    return <section>
            <ToyFilter onSetFilterBy={onSetFilterBy} />

        <button onClick={onAddToy}>Add random toy</button>
        <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy} />
    </section>

}