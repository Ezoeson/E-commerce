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
  Toast,
} from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../../Component/Loader';
import Message from '../../Component/Message';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Paginates from '../../Component/Paginates';

function ProductListScreen() {
  const { pageNumber } = useParams();
  console.log(pageNumber);

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure want to create a new product ?')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure ?')) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success(`Product ${id} is deleted`);
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          {' '}
          <h1>Products</h1>{' '}
        </Col>
        <Col className='text-end'>
          <Button className='btn-sm m-3' onClick={createProductHandler}>
            <FaEdit /> Create product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Id</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORIE</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.lenght !== 0 ? (
                data.products.map((product) => (
                  <tr key={product._id}>
                    <td> {product._id} </td>
                    <td> {product.name} </td>
                    <td>${product.price} </td>
                    <td> {product.category} </td>
                    <td> {product.brand} </td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant='success' className='btn-sm mx-2'>
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(product._id)}
                      >
                        <FaTrash style={{ color: 'white' }} />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <td>Pas de produit</td>
              )}
            </tbody>
          </Table>
          <Paginates pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  );
}

export default ProductListScreen;
