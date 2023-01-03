import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { productDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = () => {
    const [quantity, setQuantity] = useState(1)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()
    const currentProduct = useSelector(state => state.productDetails)
    const { loading, error, product } = currentProduct
    useEffect(() => {
        dispatch(productDetails(id))


    }, [dispatch, id])
    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${quantity}`)

    }
    return (
        <>
            <Link className='btn btn-dark my-3' to='/'>
                Go Back
            </Link>
            {loading ?
                <Loader />
                : error ?
                    <Message variant='danger'>
                        {error}
                    </Message> :
                    (
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>{product.name}</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Price: ${product.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Description : {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Price:
                                                </Col>
                                                <Col>
                                                    <strong>${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Status:
                                                </Col>
                                                <Col>
                                                    {product.unitsInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {product.unitsInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Quantity
                                                    </Col>
                                                    <Col>
                                                        <Form.Control
                                                            as='select'
                                                            value={quantity}
                                                            onChange={(e) => setQuantity(e.target.value)}>
                                                            {[...Array(product.unitsInStock).keys()].map(x => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))}

                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}
                                        <ListGroup.Item className="text-center">
                                            <Button
                                                className='btn-block mx-auto' type='button'
                                                disabled={product.unitsInStock === 0}
                                                onClick={addToCartHandler}
                                            >
                                                ADD TO CART
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>

                    )
            }

        </>

    )
}

export default ProductScreen