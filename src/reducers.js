import { fetchFireFlyEpisodsRequest, fetchFireFlyEpisodsSuccess, fetchFireFlyEpisodsFailure} from './actions/actions'
import {handleAction, handleActions} from 'redux-actions'
import { combineReducers } from 'redux'

/*1 cпособ через switch-case*/
// const FETCH_FIREFLY_EPISODS_REQUEST = 'FETCH_FIREFLY_EPISODS_REQUEST'
// const FETCH_FIREFLY_EPISODS_SUCCESS = 'FETCH_FIREFLY_EPISODS_SUCCESS'
// const FETCH_FIREFLY_EPISODS_FAILTURE = 'FETCH_FIREFLY_EPISODS_FAILTURE'

/*const initialState = {
    episodes:[],
    error: null,
    isFetching: false,
    isFetched: false
}

export default (state = initialState, action) => { //cпособ без combineReducsers
    switch(action.type) {
        case fetchFireFlyEpisodsRequest.toString():
            return {...state, isFetching: true, isFetched: false}
        case fetchFireFlyEpisodsSuccess.toString():
            return {
                ...state, 
                isFetching: false, 
                isFetched: true, 
                episodes: action.payload 
            }
        case fetchFireFlyEpisodsFailure.toString():
            return {
                ...state, 
                isFetching: false, 
                isFetched: true, 
                error: action.error
            }
        default: return state
    }
}*/

/*2 cпособ разбивать acrions*/

/*const episodes = (state = [], action) => {
    if ((action.type) === fetchFireFlyEpisodsRequest.toString()) {
        return action.payload
    }
    return state
}*/

/*3 cпособ handleAction и createAction или createActions(в ./actions/actions.js)*/
const episodes = handleAction(
    fetchFireFlyEpisodsSuccess, //action.type,  не нужен toString   
    (state, action) => action.payload, 
    [] //initital state
)

const error = handleAction(
    fetchFireFlyEpisodsFailure, 
    (state, action) => error,  
    null 
)

const isFetching = handleActions(
    {
        [fetchFireFlyEpisodsRequest]: (/*state, action*/) => true,
        [fetchFireFlyEpisodsSuccess]: () => false,
        [fetchFireFlyEpisodsFailure]: () => false
    }, 
false)

const isFetched = handleActions({
    [fetchFireFlyEpisodsRequest]: () => false,
    [fetchFireFlyEpisodsSuccess]: () => true,
    [fetchFireFlyEpisodsFailure]: () => true
 
}, false)

/*const isFetched = (state = false, action) => {
    switch(action.type) {
        case fetchFireFlyEpisodsRequest.toString():
            return true
        case fetchFireFlyEpisodsSuccess.toString():
            return  false
        case fetchFireFlyEpisodsFailure.toString():
            return false
        default: return state
    }
}*/

export default combineReducers({
    isFetched,
    isFetching,
    episodes,
    error
})

export const getEpisodes = state => { 
    return state.episodes 
}

export const getIsFetching = state => state.isFetching
export const getIsFetched = state => state.isFetched
export const getError = state => state.error