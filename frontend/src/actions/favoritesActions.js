import axios from 'axios'
import {
    FAVORITES_ADD_ITEM,
    FAVORITES_REMOVE_ITEM,
} from '../constants/favoritesConstants'

export const addToFavorites = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: FAVORITES_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            unitsInStock: data.unitsInStock,
        }
    })
    localStorage.setItem('favoritesItems', JSON.stringify(getState().favorites))
}

export const removeFromFavorites = (id) => (dispatch, getState) => {
    dispatch({
        type: FAVORITES_REMOVE_ITEM,
        payload: id
    })
    localStorage.setItem('favoritesItems', JSON.stringify(getState().favorites))
}

