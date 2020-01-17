import React from 'react'

export default function ({cartItem}) {
    return (
        <li className="cart-item mb-4">
            <div className="item-info">               
                <img src={`../${cartItem.image}`} alt={cartItem.title} width="35px" height="35px"/>
                <h6 className="text-uppercase">{cartItem.title}</h6>
            </div>

            <h6 className="item-count text-title text-capitalize">{cartItem.count}</h6>
        </li>
    )
}
