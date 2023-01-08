import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin



    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            navigate('/login')

        }
    }, [dispatch, navigate, userInfo])


    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Orders</h1>
                </Col>
            </Row>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>SHIPPING ADDRESS</th>
                                <th>PAYMENT METHOD</th>
                                <th>TOTAL PRICE</th>
                                <th>PAID</th>
                                <th>DELIVERD</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user && order.user.name}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.shippingAddress.address},{' '}
                                        {order.shippingAddress.city}{' '}
                                        {order.shippingAddress.postalCode},{' '}
                                        {order.shippingAddress.country}</td>
                                    <td>{order.paymentMethod}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>{order.isPaid ? (order.paidAt.substring(0, 10)) : (<i className='fas fa-times' style={{ color: 'red' }}></i>)}</td>
                                    <td>{order.isDelivered ? (order.deliveredAt.substring(0, 10)) : (<i className='fas fa-times' style={{ color: 'red' }}></i>)}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant='light' size='sm'>
                                                Details
                                            </Button>
                                        </LinkContainer>
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

export default OrderListScreen