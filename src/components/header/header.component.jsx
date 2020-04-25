import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import { auth } from '../../firebase/firebase.utils'
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss'


const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {currentUser ? (
                <div className='option' onClick={() => auth.signOut()}>
                    SIGN OUT
                </div>
                ) : (
                <Link className= 'option' to='/signin'>
                    SIGN IN
                </Link>
            )}
            <CartIcon />
        </div>
        {hidden ? null : <CartDropdown/>}
    </div>
);
// state = root-reducer i metoda przesyła obiekt currentUser który jest pobierany z root-reducer, który odwołuje się do name user, który odwołuje się do user-reducer, który to
// zwraca odpowiedni obiekt
//{user: { currentUser }} - destrukturyzacja zagniezdzonych danych

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

// const mapStateToProps = state => ({
//     currentUser: selectCurrentUser(state),
//     hidden: selectCartHidden(state)
// });

// connect to komponent funkcyjny modyfikujący komponenty, tutaj pierwszym argumentem jest funkcja odwołująca się do pobrania obiektu z root-reducer, a drugim komponent, który
// chcemy zmienić
export default connect(mapStateToProps)(Header);
