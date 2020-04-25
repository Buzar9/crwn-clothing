import CartActionTypes from './cart.types'

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
          return {
              ...state,
              hidden: !state.hidden
          };
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                //tworzy nowy obiekt z nową listą złożoną ze wszystkich poprzednich cartItems + nowy cartItem
                cartItems: [...state.cartItems, action.payload]
            };
        default:
            return state;
    }
}

export default cartReducer;
