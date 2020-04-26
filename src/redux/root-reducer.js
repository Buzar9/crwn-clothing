import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// pobranie localStorage z przeglądarki
import storage from 'redux-persist/lib/storage'
// pobranie sessionStorage z przeglądarki
//import storageSession from 'redux-persist/lib/storage/session'

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";

// root-reducer to po prostu zbiorowy eksport wszystkich reducers

// w combineReducers porządkujemy obiekty zwracane przez wszytie reducery i eksportujemy ich obiekty do store

const persistConfig = {
    key: 'root',
    // źródło z którego czerpiemy do persist
    storage,
    // które reducers chcemy dokładnie persist (podtrzymać)
    whitelist: ['cart']
};

//Jeżeli nie używamy persit, możemy exportować rootReducer od razu,
//Jeżeli używamy persist, musimy exportować rootReducer wraz z persistConfig
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer
});

export default persistReducer(persistConfig, rootReducer);
