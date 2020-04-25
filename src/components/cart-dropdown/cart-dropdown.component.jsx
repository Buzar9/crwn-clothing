import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { withRouter } from 'react-router-dom';

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems} from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import './cart-dropdown.styles.scss'

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {/* możemy użyć takiej konstrukcji, ponieważ 0 zwraca fałsz*/}
            {cartItems.length ? (
                cartItems.map(cartItem => (
                <CartItem key={cartItem.id} item={cartItem} />
                ))
            ) : (
                <span className='empty-message'>Your cart is empty</span>
            )}
        </div>
        <CustomButton onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden());
        }}>
            GO TO CHECKOUT</CustomButton>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

// jeżeli mapStateToProps nie jest drugim argumentem, connect automatycznie przesyła dispach do propsów - dzięki temu możemy użyć ich bez pisania osobnej metody
// withRouter musi zwrócić już gotowy component, dlatego connect jest wewnątrz
export default withRouter(connect(mapStateToProps)(CartDropdown));
