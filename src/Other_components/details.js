import React from 'react'
import '../css/details.css'

function Details({
    visibility,
    onClose,
    product,
}) {
    return (
        <div className='modal' style={{ display: visibility ? "block" : "none" }}>
            <div className='details'>
                {visibility && product && (
                    <div>
                        <h1>{product.product_name}</h1>
                        <div className='product_info'>
                            <img src={product.thumb} alt={product.product_name} />
                            <p>{product.description}</p>
                        </div>
                        <p className='product_price'>{product.price}{product.currency}</p>
                    </div>
                )}
                <button className='btn close_btn' onClick={onClose}>
                        <p>Close</p>
                </button>
            </div>
        </div>
    )
}

export default Details;