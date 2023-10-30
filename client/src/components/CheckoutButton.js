import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  "pk_test_51O5vqNFi2BcJnxILc59QiYGTRBsydIj1gxeg0u3F2CLIrExeQqHhcQFkiDiuJKcbmcX8nRHWqdl9IOG8HrsV7V0O00031E6PP9"
);

/*
  Stripe Test Card Numbers:
  Successful charge: 4242 4242 4242 4242
  Unsuccessful charge: 4000 0000 0000 9995
  Authentication Required: 4000 0027 6000 3184

  Expiration, CVC and Zip can be anything
*/

const CheckoutButton = () => {
  const handleClick = async (event) => {
    // Call your backend to create the Checkout session
    const response = await fetch('http://localhost:3001/create-checkout-session', { method: 'POST' });
    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout
    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer.
      alert(result.error.message);
    }
  };

  return <button role="link" onClick={handleClick}>Buy Now</button>;
};

export default CheckoutButton;
