import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from "react-router-dom";
// musi być parentem wszytkiego, żeby używać go w całej aplikacji. Daje dostęp do reduxa
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from "./redux/store";


import './index.css';
import App from './App';

ReactDOM.render(
    // Provider ma dostęp do store i możliwość przekazywana danych ze store do wszystkich komponentów (dlatego musi być parentem wszystkiego)
    <Provider store={store}>
        <BrowserRouter>
            {/*     ważne jest aby app była wewnatrz persistGate, poniewaz tylko wtedy ma dostęp do swojej utrzymywanej (persist) wersji*/}
            <PersistGate persistor={persistor}>
                <App/>
            </PersistGate>
        </BrowserRouter>
    </Provider>,
 document.getElementById('root')
);
