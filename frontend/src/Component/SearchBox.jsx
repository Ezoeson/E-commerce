import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

function SearchBox() {
  const navigate = useNavigate();
  const { keyword: urlkeyword } = useParams();
  const [keyword, setKeyword] = useState(urlkeyword || '');

  const submitHandler = (e) => {
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };
  useEffect(() => {
    submitHandler();
  }, [keyword]);

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Search product'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      {/* <Button type='submit' variant='outline-success' className='p-2 mx-2'>
        Search
      </Button> */}
    </Form>
  );
}

export default SearchBox;
