import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers'
import { fetchFireFlyEpisodsRequest, fetchFireFlyEpisodsSuccess, fetchFireFlyEpisodsFailure} from './actions/actions'

const middleware = store => next => action => {
    if (
      action.type === fetchFireFlyEpisodsRequest.toString()
    ) {
      fetch('http://api.tvmaze.com/shows/80/episodes', {
        method: 'GET',
        mode: 'cors'
      })
        .then(response => {          
          return response.json();
        })
        .then(episodes => {
          store.dispatch(
            fetchFireFlyEpisodsSuccess(episodes)            
          );
        })
        .catch(error => {
          store.dispatch(fetchFireFlyEpisodsFailure(error));
        });
    }
    return next(action);
  };

// function middlewarefunc (store) {
//     return function (next) {
//         return function (action) {
//             return next(action)
//         }
//     }
// }

export default (/*initialState*/) => 
createStore(
    //initialState,
    rootReducer, 
    compose(
        applyMiddleware(middleware),
        window.devToolsExtension
          ? window.__REDUX_DEVTOOLS_EXTENSION__()
          : f => f
      )
);
