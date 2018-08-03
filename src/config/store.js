import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from '../reducers';


const middlewares = [ReduxThunk];

let enhancers;

if (process.env.NODE_ENV === 'development') { // eslint-disable-line 
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line 
    enhancers = composeEnhancers(applyMiddleware(...middlewares));
} else {
    enhancers = applyMiddleware(...middlewares);
}


const store = createStore(reducers, enhancers);

export default store;
