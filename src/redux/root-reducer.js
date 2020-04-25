import { combineReducers } from 'redux';

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";

// root-reducer to po prostu zbiorowy eksport wszystkich reducers

// w combineReducers porządkujemy obiekty zwracane przez wszytie reducery i eksportujemy ich obiekty do store

export default combineReducers({
    user: userReducer,
    cart: cartReducer
});
