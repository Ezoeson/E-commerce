import React from 'react';

import {
  Row,
  Image,
  Col,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from 'react-bootstrap';

import { Link, useParams, useNavigate } from 'react-router-dom';
import Rating from '../Component/Rating';
import { motion } from 'framer-motion';
import {
  useGetProductsByIdQuery,
  useCreateReviewMutation,
} from '../slices/productsApiSlice';
import Loader from '../Component/Loader';
import Message from '../Component/Message';
import { useState } from 'react';
import { addToCart } from '../slices/cartSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Meta from '../Component/Meta';


const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductsByIdQuery(productId);

  const [createReview, { isLoading: loadingProdudctReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review  Submited');
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ x: [-10, 10, 0] }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 100 }}
      >
        <Link className='btn btn-light my-3' to='/'>
          <motion.p>Go to back</motion.p>
        </Link>
      </motion.div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
        <Meta title={product.name}  />
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, type: 'spring', stiffness: 100 }}
          >
            <Row>
              <Col md={5}>
                <Image
                  src={`http://localhost:5001${product.image}`}
                  alt={product.name}
                  fluid
                />
              </Col>
              <Col md={4}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item> Price: ${product.price} </ListGroup.Item>
                  <ListGroup.Item>
                    Description: `{product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>${product.price} </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>status:</Col>
                        <Col>
                          <strong>
                            {product.countInStock > 0
                              ? 'In stock'
                              : 'out of stock'}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroupItem>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control
                              as='select'
                              value={qty}
                              onChange={(e) => setQty(Number(e.target.value))}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    )}
                    <ListGroup.Item>
                      <Button
                        className='btn-block'
                        type='button'
                        disabled={product.countInStock === 0}
                        onClick={() => addToCartHandler()}
                      >
                        ADD To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row className='review'>
              <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant='flush'>
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong> {review.name} </strong>
                      <Rating value={review.rating} />
                      <p> {review.createdAt.substring(0, 10)} </p>
                      <p> {review.comment} </p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Write a customer Review</h2>
                    {loadingProdudctReview && <Loader />}

                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating' className='my-2'>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                          >
                            <option value=''>Select ...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment' className='my-2'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            rows='3'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          disabled={loadingProdudctReview}
                          type='submit'
                          variant='primary'
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to='/login'>Sign in</Link> to write a
                        review
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </motion.div>
        </>
      )}
    </>
  );
};

export default ProductScreen;
