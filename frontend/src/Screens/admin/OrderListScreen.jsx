import React from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
  Table,
} from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../../Component/Loader';
import Message from '../../Component/Message';
import { FaTimes } from 'react-icons/fa';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';

function OrderListScreen() {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <h2>Orders</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Id</th>
            
              <th>DATE</th>
              <th>TOTAL</th>

              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td> {order._id} </td>
                
                <td> {order.createdAt.substring(0, 10)} </td>
                <td> {order.totalPrice} </td>
                {/* <td>
                  
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td> */}
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className='btn-sm' variant='light'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default OrderListScreen;
