/* eslint-disable no-unused-vars */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

import Product from '../Component/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../Component/Loader';
import Message from '../Component/Message';
import { Link, useParams } from 'react-router-dom';
import Paginates from '../Component/Paginates';
import ProductCarrousel from '../Component/ProductCarrousel';
import Meta from '../Component/Meta';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <ProductCarrousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4 '>
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title='MoraShop' />
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
          >
            Latest Products
          </motion.h1>
          <motion.div
            bg='dark'
            variant='dark'
            initial={{ opacity: 0, x: -400 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, type: 'spring', stiffness: 100 }}
          >
            <Row>
              {data.length !==0 ?data.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              )):(
                <Row>
                  <Col>Pas de produit</Col>
                </Row>
              )}
            </Row>
            <Paginates
              pages={data.pages}
              page={data.page}
              keyword={keyword ? keyword : ''}
            />
          </motion.div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
