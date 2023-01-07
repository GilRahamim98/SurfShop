import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContanier from '../components/FormContainer'
import { productDetails } from '../actions/productActions'

const ProductEditScreen = () => {
    const { id: productId } = useParams()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [unitsInStock, setUnitsInStock] = useState(0)
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()

    const currentProduct = useSelector(state => state.productDetails)
    const { loading, error, product } = currentProduct




    useEffect(() => {


        if (!product.name || product._id !== productId) {
            dispatch(productDetails(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setUnitsInStock(product.unitsInStock)
            setDescription(product.description)
        }



    }, [dispatch, navigate, product, productId])

    const submitHandler = (e) => {
        e.preventDefault()


    }
    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
            <FormContanier>
                <h1>Edit {product.name}</h1>

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                    (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name </Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='price'>
                                <Form.Label>Price </Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='image'>
                                <Form.Label>Image </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter image url'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='brand'>
                                <Form.Label>Brand </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter brand'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='category'>
                                <Form.Label>Category </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter category'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='unitsInStock'>
                                <Form.Label>UnitsInStock </Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter units in stock'
                                    value={unitsInStock}
                                    onChange={(e) => setUnitsInStock(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='description'>
                                <Form.Label>Description </Form.Label>
                                <Form.Control
                                    type='textarea'
                                    rows={4}
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>



                            <Button type='submit' variant='primary'>
                                Edit
                            </Button>
                        </Form>

                    )

                }
            </FormContanier>



        </>

    )
}

export default ProductEditScreen