import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Button, Col } from 'react-bootstrap';
import ChekoutSteps from '../Component/ChekoutSteps';
import FormContainer from '../Component/FormContainer';
import { useNavigate } from 'react-router-dom';
import { savePayementMethod } from '../slices/cartSlice';

function PayementScreen() {
  const [payementMethod, setPayementMethod] = useState('Paypal');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayementMethod(payementMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <ChekoutSteps step1 step2 step3 />
      <h1>Payement Method</h1>
      <Form onSubmit={submitHandler} >
        <Form.Group>
          <Form.Label as='legend'>Select Method </Form.Label>
          <Col>
            <Form.Check
              type='radio'
              className='my-2'
              label='Paypal or Credit Card'
              id='Paypal'
              name='payementMethod'
              value='Paypal'
              checked
              onChange={(e) => setPayementMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PayementScreen;
