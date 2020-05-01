import React from 'react'

import {
    CartItemContainer,
    ItemDetailsContainer,
    NameContainer,
    PriceContainer,
    ImageContainer
} from "./cart-item.styles";

const CartItem = ({ item: { imageUrl, price, name, quantity} }) => (
    <CartItemContainer>
        <ImageContainer src={imageUrl} />
        <ItemDetailsContainer>
            <NameContainer>{name}</NameContainer>
            <PriceContainer>
                {quantity} x ${price}
            </PriceContainer>
        </ItemDetailsContainer>
    </CartItemContainer>
);

export  default CartItem;
