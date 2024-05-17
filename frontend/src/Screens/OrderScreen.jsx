import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Component/Loader';
import Message from '../Component/Message';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalclientIdQuery,
  useDeliverOrderMutation,
} from '../slices/ordersApiSlice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

function OrderScreen() {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { idLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  // const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  // const {
  //   data: paypal,
  //   isLoading: loadingPaypal,
  //   error: errorPaypal,
  // } = useGetPaypalclientIdQuery();
  const { userInfo } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (!errorPaypal && !loadingPaypal && paypal.cliendId) {
  //     const loadPaypalScript = async () => {
  //       paypalDispatch({
  //         type: 'resetOptions',
  //         value: {
  //           'client-id': paypal.clientId,
  //           currency: 'USD',
  //         },
  //       });
  //       paypalDispatch({
  //         type: 'setLoadingStatus',
  //         value: 'pending',
  //       });
  //     };
  //     if (order && !order.isPaid) {
  //       if (!window.paypal) {
  //         loadPaypalScript();
  //       }
  //     }
  //   }
  // }, [order, paypal, paypalDispatch, loadingPaypal, errorPaypal]);

  // function onApprove() {}
  // function onApproveTest() {}
  // function onError() {}
  // function createOrder() {}

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      console.log(deliverOrder());
      refetch();

      toast.success('Order delivered');
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger' />
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email:</strong> {order.user.email}
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address},
                {order.shippingAddress.city},{order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>

              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}{' '}
                </Message>
              ) : (
                <Message variant='danger'>Not delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payement Method</h2>
              <p>
                <strong>Method:</strong> {order.payementMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt} </Message>
              ) : (
                <Message variant='danger'>Not paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image
                        src={`http://localhost:5001${item.image}`}
                        alt={item.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}> {item.name} </Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* PAY ORDER PLACEHOLDER */}
              {/* {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <Button
                        onClick={onApproveTest}
                        style={{ marginBottom: '10px' }}
                      >
                        Test Pay Order
                      </Button>
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )} */}

              {/* MARK AS DELIVERED PLACEHOLDER */}
              {loadingDeliver && <Loader />}

              {userInfo && userInfo.isAdmin && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={deliverOrderHandler}
                  >
                    {' '}
                    Mark As Delivered{' '}
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default OrderScreen;
