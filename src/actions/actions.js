import {/*createAction,*/ createActions} from 'redux-actions'

export const {
  firefly: {
    fetchFireFlyEpisodsRequest, //теперь type = FIREFLY/FETCH_FIRE_FLY_EPISODS_REQUEST - можно создавать нэймспейсы
    fetchFireFlyEpisodsSuccess, 
    fetchFireFlyEpisodsFailure
  }
} = createActions({
  FIREFLY: {
    FETCH_FIRE_FLY_EPISODS_REQUEST: undefined, //если указываем undefined, то payload приходит с первого аргумента
    FETCH_FIRE_FLY_EPISODS_SUCCESS: [
      episods => episods,//payload
      episods => ({length: episods.length})//meta
    ],
    FETCH_FIRE_FLY_EPISODS_FAILURE: undefined
  }
})

/*export const fetchFireFlyEpisodsRequest = createAction(
    'FETCH_FIREFLY_EPISODS_REQUEST'
)

export const fetchFireFlyEpisodsSuccess = createAction(
  'FETCH_FIREFLY_EPISODS_SUCCESS',//type
  episods => episods,//payload
  episods => ({length: episods.length}) //meta
  
)

export const fetchFireFlyEpisodsFailure = createAction(
  'FETCH_FIREFLY_EPISODS_FAILTURE',
)*/