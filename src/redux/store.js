import { createStore, applyMiddleware } from 'redux';
import {persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root-reducer'

// stworzenie nowej zmiennej jako array pozwala na większą elastycznosc
// const middlewares = [logger];

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// persistor = wersja store, która jest persist (utrzymywna)
export const persistor = persistStore(store);

export default { store, persistor };
