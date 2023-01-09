import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ToyList } from "../cmps/toy-list"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { loadToys, removeToy } from "../store/toy.action"

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

    function onRemoveToy(toyId){
        removeToy(toyId)
        .then(() => {
            showSuccessMsg('Toy removed')
        })
        .catch(err => {
            showErrorMsg('Cannot remove toy')
        })
    }





    return (
        <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy}/>
    )
}