import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Meta from '../components/Meta'


const CartScreen = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { id } = useParams()
    const quantity = searchParams.get('qty') ? Number(searchParams.get('qty')) : 1
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, quantity))
        }
    }, [dispatch, id, quantity])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {
        navigate('/shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <Meta title="Cart" />
                <h1>Shopping Cart</h1>
                {cartItems.length === 0
                    ? <Message>There are no items in your cart
                        <Link to="/">Start Adding</Link>
                    </Message> :
                    (
                        <ListGroup variant='flush'>
                            {cartItems.map(cartItem => (
                                <ListGroup.Item key={cartItem.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={cartItem.image}
                                                alt={cartItem.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${cartItem.product}`}>
                                                {cartItem.name}
                                            </Link>
                                        </Col>
                                        <Col md={2}>
                                            ${cartItem.price}
                                        </Col>
                                        <Col md={2}>
                                            <Form.Select
                                                value={cartItem.quantity}
                                                onChange={(e) =>
                                                    dispatch(addToCart(cartItem.product, Number(e.target.value)))
                                                }>
                                                {[...Array(cartItem.unitsInStock).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}

                                            </Form.Select>
                                        </Col>
                                        <Col md={2}>
                                            <Button type='button' variant='light' onClick={() =>
                                                removeFromCartHandler(cartItem.product)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>

                                    </Row>

                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )
                }

            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items</h2>
                            ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Procced to checkout

                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>

            </Col>

        </Row>
    )
}

export default CartScreen