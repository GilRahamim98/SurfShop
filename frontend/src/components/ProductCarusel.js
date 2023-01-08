import React, { useEffect, useState } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'


const ProductCarusel = () => {
    const dispatch = useDispatch()
    const [blur, setBlur] = useState(false)

    const productTopRated = useSelector(state => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])


    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Carousel pause='hover' variant='dark'>
            {products.map(product => (
                <Carousel.Item key={product._id} onMouseOver={() => setBlur(true)} onMouseLeave={() => setBlur(false)} >
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} className={blur ? 'carousel-blur' : ''} fluid />
                        {blur && <Carousel.Caption className='carousel-caption'>
                            <h2>{product.name} (${product.price})</h2>
                        </Carousel.Caption>}
                    </Link>
                </Carousel.Item>
            ))}

        </Carousel>
    )
}

export default ProductCarusel