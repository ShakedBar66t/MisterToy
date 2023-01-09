import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ToyList } from "../cmps/toy-list"
import { showErrorMsg } from "../services/event-bus.service"
import { loadToys } from "../store/toy.action"

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


    return (
        <ToyList
            toys={toys} />
    )
}