import React from 'react';
import { Route } from 'react-router-dom'

import CollectionOverview from '../../components/collection-overview/collections-overview.component'
import CollectionPage from "../collection/collection.component";

//Route w App.js automatycznie zagnieżdża path jako match, history i location
const ShopPage = ({ match }) =>   (
    <div className='shop-page'>
        {/* `${match.path}` = /shop (w tym przypadku)/ używamy takiej konstrukcji, aby komponentu nie interesowała konkretna path, ponieważ pobiera ją z poprzedniej route*/}
        <Route exact path={`${match.path}`} component={CollectionOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
);

export default ShopPage;