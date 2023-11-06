import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToFavorites, removeFromFavorites } from '../actions/favoritesActions'
import Meta from '../components/Meta'


const FavoritesScreen = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const favorites = useSelector(state => state.favorites)

    useEffect(() => {
        if (id) {
            dispatch(addToFavorites(id))
        }
    }, [dispatch, id])

    const removeFromFavoritesHandler = (id) => {
        dispatch(removeFromFavorites(id))
    }

    return (
        <Row>
            <Col md={8}>
                <Meta title="Favorites" />
                <h1>Your Favorites</h1>
                {favorites === undefined 
                    ? <Message>You didn't like anything yet! {" "}
                        <Link to="/">Start Liking Now!</Link>
                    </Message> :
                    (
                        <ListGroup variant='flush'>
                            {favorites.map(favoritesItem => (
                                <ListGroup.Item key={favoritesItem.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={favoritesItem.image}
                                                alt={favoritesItem.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${favoritesItem.product}`}>
                                                {favoritesItem.name}
                                            </Link>
                                        </Col>
                                        <Col md={2}>
                                            ${favoritesItem.price}
                                        </Col>
        
                                        <Col md={2}>
                                            <Button type='button' variant='light' onClick={() =>
                                                removeFromFavoritesHandler(favoritesItem.product)}>
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
            

        </Row>
    )
}

export default FavoritesScreen