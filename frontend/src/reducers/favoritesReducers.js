import {
    FAVORITES_ADD_ITEM,
    FAVORITES_EMPTY,
    FAVORITES_REMOVE_ITEM,
} from "../constants/favoritesConstants";

export const favoritesReducer = (state = { favoritesItems: [] }, action) => {
    switch (action.type) {
        case FAVORITES_ADD_ITEM:
            const item = action.payload
            return {
                ...state,
                favoritesItems: [...state.favoritesItems, item]
            }
        case FAVORITES_REMOVE_ITEM:
            return {
                ...state,
                favoritesItems: state.favoritesItems.filter(favoritesItem => favoritesItem.product !== action.payload)
            }
        case FAVORITES_EMPTY:
            return {
                ...state,
                favoritesItems: []
            }
        default:
            return state
    }
}