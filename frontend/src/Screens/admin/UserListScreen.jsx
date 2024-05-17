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
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';

function UserListScreen() {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure ?')) {
      try {
        await deleteUser(id);
        toast.success(`deleted user ${id}`);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <>
      <h2>Users</h2>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table
          striped
          hover
          responsive
          className='table-sm'
          bg='dark'
          variant='dark'
        >
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td> {user._id} </td>
                <td>
                  {' '}
                  <Image
                    src={`http://localhost:5001${user.image}`}
                    alt={user.name}
                    fluid
                    rounded
                  />{' '}
                </td>
                <td> {user.name} </td>
                <td>
                  {' '}
                  <a href={`mailto:${user.email}`}>{user.email} </a>{' '}
                </td>
                <td>
                  {' '}
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}{' '}
                </td>

                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button className='btn-sm' variant='light'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    className='btn-sm'
                    variant='danger'
                    onClick={() => {
                      deleteHandler(user._id);
                    }}
                  >
                    <FaTrash style={{ color: 'white' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default UserListScreen;
