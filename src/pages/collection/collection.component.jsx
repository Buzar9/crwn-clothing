import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from "../../components/collection-item/collection-item.component";

import { selectCollections } from "../../redux/shop/shop.selectors";

import './collection.styles.scss'

const CollectionPage = ({ collection }) => {
    const { title, items } = collection;
    return (
    <div className='collection-page'>
        <h2 className='title'>{ title }</h2>
        <div className='items'>
            {
            items.map(item => <CollectionItem key={item.id} item={item} />)
            }
        </div>
    </div>
);
};

// ownProps - propsy nie pochodzące z reduxa w tym przypadku match, hitory i location przesyłane przez Route z shop.component
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollections(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
