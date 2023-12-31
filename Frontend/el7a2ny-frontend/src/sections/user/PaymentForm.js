import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
// import { paymentAxios } from '../../utils/AxiosConfig';
import CheckoutForm from './CheckoutForm';
import axios from 'axios';
import { Card } from '@mui/material';
const stripePromise = loadStripe('pk_test_51OA3YuHNsLfp0dKZSCi30qg6xY63jh2SiffqCIa42j0oTXnZ29hNOalf44tjkJZsjT27xldMpzbojdn6vYcEx9CI00kvtRqele');
import Cookies from 'js-cookie';
import Message from 'src/components/Message';


export default function PaymentForm(props) {
  const { activeStep, setStep, address } = props;
  const [clientSecret, setClientSecret] = useState('');
  const [products, setProducts] = useState(null);
  const [total, setTotal] = useState(0);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const username = Cookies.get('username');
  useEffect(() => {
    axios.get('http://localhost:8001/patient/getCart?username=' + username).then(response => { // done new Route
      console.log(response.data);
      setProducts(response.data);
      // const gtotal = calculateTotal(response.data);
      // setTotal(gtotal);
    }
    ).catch(error => {
      console.log('error here ---->', error);
      setShowError(true);
      setErrorMessage(error.response.data.message);
    });
  }, [])
  useEffect(() => {
    console.log('PaymentForm.js was here');
    // Create PaymentIntent as soon as the page loads
    axios.post('http://localhost:8001/create-payment-intent', {})
      .then((data) => setClientSecret(data.data.clientSecret)).catch((error) => {
        console.log(error);
        setShowError(true);
        setErrorMessage(error.response.data.message);
      });
  }, []);




  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (

    <div className='PaymentForm'>
      <Message condition={showError} setCondition={setShowError} message={errorMessage} title="Error" buttonAction="Close" />

      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm activeStep={activeStep} setStep={setStep} address={address} />
        </Elements>
      )}

    </div>


  );
}