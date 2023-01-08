import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts, deleteProduct, addProduct } from '../actions/productActions'
import { PRODUCT_ADD_RESET } from '../constants/productConstants'

const ProductListScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productAdd = useSelector(state => state.productAdd)
    const { loading: loadingAdd, error: errorAdd, success: successAdd, product: addedProduct } = productAdd

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin



    useEffect(() => {
        dispatch({ type: PRODUCT_ADD_RESET })

        if (!userInfo.isAdmin) {
            navigate('/login')
        }
        if (successAdd) {
            navigate(`/admin/product/${addedProduct._id}/edit`)
        } else {
            dispatch(listProducts())

        }
    }, [dispatch, navigate, userInfo, successDelete, successAdd, addedProduct])

    const addProductHandler = () => {
        dispatch(addProduct())
        if (successAdd) {
            console.log("hey");
            navigate(`/admin/product/${addedProduct._id}/edit`)
        }

    }

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteProduct(id))
        }
    }
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={addProductHandler}>
                        <i className='fas fa-plus'></i>Add Product
                    </Button>
                </Col>

            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingAdd && <Loader />}
            {errorAdd && <Message variant='danger'>{errorAdd}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' size='sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' size='sm' onClick={() => deleteHandler(product._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )
            }
        </>
    )
}

export default ProductListScreen