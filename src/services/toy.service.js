import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'
import { localStorageService } from './local.storage.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter
}

function query(filterBy = getDefaultFilter()) {
    const queryParams = `?name=${filterBy.txt}&maxPrice=${filterBy.maxPrice}`
    return httpService.get(BASE_URL + queryParams)
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        // when switching to backend - remove the next line
        return httpService.post(BASE_URL, toy)
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: 0 }
}

function _createToys(){
    let toys = localStorageService.loadFromStorage(STORAGE_KEY) || []
    if (!toys || !toys.length) {
        toys = []
        toys.push(_createToy('Talking Doll', 123, ['Doll', 'Battery Powered', 'Baby'], 1631031801011, true ))
        localStorageService.saveToStorage(STORAGE_KEY, toys)
    }
}

function _createToy(name, price, labels, createdAt, inStock){
    const toy = getEmptyToy(name, price, labels, createdAt, inStock)
    toy._id = utilService.makeId()
    return toy
}

function getEmptyToy(name = '', price = '', labels = '', createdAt = '', inStock ='') {
    return {name, price, labels, createdAt, inStock}
}