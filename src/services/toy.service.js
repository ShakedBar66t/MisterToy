import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
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
    getDefaultFilter,
    getEmptyToy,
    getRandomToy,
    getToyLabels
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(STORAGE_KEY).then((toys) => {
        if (filterBy.name) {
            const regex = new RegExp(filterBy.name, 'i')
            toys = toys.filter((toy) => regex.test(toy.name))
        }
        return toys
    })
}

function getById(toyId) {
    console.log(toyId)
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
    // return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    console.log('from toy save', toy._id)
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getDefaultFilter() {
    return {name: '', inStock: true , label: [], sortBy: '', desc: 1}
}

function _createToys() {
    let toys = localStorageService.loadFromStorage(STORAGE_KEY) || []
    if (!toys || !toys.length) {
        toys = []
        toys.push(_createToy('Talking Doll', 123, ['Doll', 'Battery Powered', 'Baby'], 1631031801011, false, `https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/51apIMpY0JL._AC_SL1026_.jpg`))
        toys.push(_createToy('Remote Control Helicopter', 150, ['Helicopter', 'Battery Powered', 'Army'], 1631031801011, true, `https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/61xZIpSZVSL._AC_SL1500_.jpg`))
        localStorageService.saveToStorage(STORAGE_KEY, toys)
    }
}

function _createToy(name, price, labels, createdAt, inStock, src) {
    const toy = getEmptyToy(name, price, labels, createdAt, inStock, src)
    toy._id = utilService.makeId()
    return toy
}

function getEmptyToy(name = '', price = '', labels = '', createdAt = '', inStock = '', src = '') {
    return { name, price, labels, createdAt, inStock, src }
}

function getRandomToy() {
    return {
        name: 'Teddy Bear',
        createdAt: new Date(),
        price: utilService.getRandomIntInclusive(50, 200),
        inStock: true,
        src: 'https://cdn-icons-png.flaticon.com/512/37/37889.png?w=740&t=st=1673288619~exp=1673289219~hmac=2841155265d67f91852718c7b22a6897d5225f9af3d2ee926b934a83ccab8037',
        labels: ['Teddy Bear', 'Happy', 'Fur']

    }
}

function getToyLabels() {
    const labels = ["Doll", "Battery Powered", "Baby", "Helicopter", "Army", "Teddy Bear", "Happy", "Fur"]
    return labels
}

