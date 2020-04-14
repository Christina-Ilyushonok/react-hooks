import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import createStore from './store';

import {getEpisodes, getIsFetching, getIsFetched, getError} from './reducers'
import { fetchFireFlyEpisodsRequest} from './actions/actions'


const store = createStore();

class  App extends Component {
  componentDidMount() {
    const {isFetched} = this.props

    if (!isFetched) {
      this.props.fetchFireFlyEpisodsRequest();
    }
  }
  render() {
    const {isFetching, error, episodes} = this.props

    if (isFetching) {
      return <p>идет загрузка...</p>
    }

    if(error !== null) {
      return <p>Oops.. {error}</p>
    }

    return (
      <div>
        {episodes.map(ep => (
          <div key={ep.id}>
            {<img src={ep.image.medium} alt="firefly" />}
          </div>
        ))}
      </div>
    );

  }
}

const mapStateToProps = state => ({
  episodes: getEpisodes(state),
  error: getError(state),
  isFetching: getIsFetching(state),
  isFetched: getIsFetched(state)
});

const mapDispatchToProps = {
  fetchFireFlyEpisodsRequest
}

const EnhancedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


ReactDOM.render(
  <Provider store={store}>
    <EnhancedApp />
  </Provider>,
  document.getElementById('root')
);