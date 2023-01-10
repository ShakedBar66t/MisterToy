import { toyService } from "../services/toy.service"

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const UNDO_REMOVE_TOY = 'UNDO_REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const TOGGLE_CART_SHOWN = 'TOGGLE_CART_SHOWN'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'
export const SET_IS_LOADING = 'SET_IS_LOADING'

export const SET_FILTER = 'SET_FILTER'



const initialState = {
    toys: [],
    lastRemovedToy: null,
    isLoading: false,
    isToyShown: false,
    shoppingToy: [],
    filterBy: toyService.getDefaultFilter()
}


export function toyReducer(state = initialState, action) {
    let toys
    let shoppingToy
    let lastRemovedToy

    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        case REMOVE_TOY:
            lastRemovedToy = state.toys.find(toy => toy._id === action.toyId)
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys, lastRemovedToy }

        case UNDO_REMOVE_TOY:
            ({ lastRemovedToy } = state)
            toys = [lastRemovedToy, ...state.toys]
            return { ...state, toys, lastRemovedToy: null }

        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }
        case UPDATE_TOY:
            toys = state.toys.map((toy) => (toy._id === action.toy._id ? action.toy : toy))
            return { ...state, toys }

        // Filter
        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }

        // Cart
        case TOGGLE_CART_SHOWN:
            return { ...state, isToyShown: !state.isToyShown }
        case ADD_TO_CART:
            shoppingToy = [...state.shoppingToy, action.toy]
            return { ...state, shoppingToy }
        case REMOVE_FROM_CART:
            shoppingToy = state.shoppingToyt.filter(c => c._id !== action.toyId)
            return { ...state, shoppingToy }
        case CLEAR_CART:
            return { ...state, shoppingToy: [] }

        default:
            return state
    }
}


