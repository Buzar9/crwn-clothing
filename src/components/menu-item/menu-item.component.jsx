import React from 'react';
import { withRouter } from 'react-router-dom';
// withRouter to funkcja, przyjmuje component i zwraca component z nowymi możliwościami. między innymi z dostępem do props.history (w tym przypadku HomePage. Robi się to, aby
// przeciewdziałać przekazywaniu propsów od komponentu, który je posiada, poprzez komponenty, które ich nie potrzebują, aby malutki komponent na końcu gałęzi mógł ich użyc.

import './menu-item.styles.scss'

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
    <div className={`${size} menu-item`}
         onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
        <div
           className='background-image'
           style={{
               background: `url(${imageUrl})`
           }}
        />
        <div className='content'>
            <h1 className='title'>{title.toUpperCase()}</h1>
            <span className='subtitle'>SHOP NOW</span>
        </div>
    </div>
)

export default withRouter(MenuItem);