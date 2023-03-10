import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { productDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET, PRODUCT_DETAILS_RESET } from '../constants/productConstants'
import Meta from '../components/Meta'

const ProductScreen = () => {
    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()

    const currentProduct = useSelector(state => state.productDetails)
    const { loading, error, product } = currentProduct

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { success: successProductReview, error: errorProductReview } = productReviewCreate

    useEffect(() => {
        if (successProductReview) {
            alert('Review Added!')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(productDetails(id))
    }, [dispatch, id, successProductReview])
    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${quantity}`)

    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(id, {
            rating,
            comment
        }))


    }
    return (
        <>
            <Link className='btn btn-dark my-3' to='/' onClick={() => dispatch({ type: PRODUCT_DETAILS_RESET })}>
                Go Back
            </Link>
            {loading ?
                <Loader />
                : error ?
                    <Message variant='danger'>
                        {error}
                    </Message> :
                    (
                        <>
                            <Meta title={product.name} />

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
                                                            <Form.Select

                                                                value={quantity}
                                                                onChange={(e) => setQuantity(e.target.value)}>
                                                                {[...Array(product.unitsInStock).keys()].map(x => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))}

                                                            </Form.Select>
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
                            <Row>
                                <Col md={6}>
                                    <h2>Reviews</h2>
                                    {product.reviews.length === 0 && <Message>No reviews yet!</Message>}
                                    <ListGroup variant='flush'>
                                        {product.reviews.map(review => (
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} />
                                                <p>{review.createdAt.substring(0, 10)}</p>
                                                <p>{review.comment}</p>


                                            </ListGroup.Item>
                                        ))}
                                        <ListGroup.Item>
                                            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                            <h2>Add a Review</h2>
                                            {userInfo ?
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Select value={rating} onChange={(e) => setRating(e.target.value)}>
                                                            <option value=''>Select...</option>
                                                            <option value='1'>1 - Poor</option>
                                                            <option value='2'>2 - Fair</option>
                                                            <option value='3'>3 - Good</option>
                                                            <option value='4'>4 - Very Good</option>
                                                            <option value='5'>5 - Excellent</option>

                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>Comment</Form.Label>
                                                        <Form.Control as='textarea' row="3" value={comment} onChange={(e) => setComment(e.target.value)}>
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Button type='submit' variant='primary'>Submit</Button>
                                                </Form>
                                                :
                                                <Message variant='warning'>Please <Link to='/login'>Sign in</Link> to add a review</Message>}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </>

                    )
            }

        </>

    )
}

export default ProductScreen